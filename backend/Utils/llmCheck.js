import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function checkRule(rule, pdfText) {
  const prompt = `
You are a compliance checker AI.

RULE:
"${rule}"

PDF TEXT:
${pdfText}

Respond ONLY in JSON:
{
  "rule": "...",
  "status": "pass/fail",
  "evidence": "...",
  "reasoning": "...",
  "confidence": 0-100
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2
  });

  const content = response.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch {
    return {
      rule,
      status: "fail",
      evidence: "Parsing error",
      reasoning: "AI returned invalid JSON",
      confidence: 0
    };
  }
}
