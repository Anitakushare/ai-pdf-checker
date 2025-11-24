import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import extractPDF from "./Utils/extractPdf.js";
import checkRule from "./Utils/llmCheck.js";


dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

// Multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"), false);
    }
    cb(null, true);
  }
});

//upload route
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF not uploaded" });
    }

    const rules = JSON.parse(req.body.rules || "[]");

    // Extract PDF text
    const text = await extractPDF(req.file.buffer);

    // Send each rule to Groq
    const results = [];

    for (let rule of rules) {
      if (!rule.trim()) {
        results.push({
          rule,
          status: "unknown",
          evidence: "",
          reasoning: "No rule text provided",
          confidence: 0
        });
        continue;
      }

  
      const aiResult = await checkRule(rule, text);

      results.push(aiResult);

    }

    res.json({
      message: "Rule checking completed",
      results
    });
    console.log(results)

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
});






const PORT=3000;
app.listen(PORT,()=>{
    console.log("Server running on port:",PORT)
});
