import { PDFParse } from "pdf-parse";

export default async function extractPDF(buffer) {
  try {
    // Create parser instance with buffer
    const parser = new PDFParse({ data: buffer });

    // Extract text
    const result = await parser.getText();

    //destroy parser to free memory
    await parser.destroy();

    return result.text;

  } catch (err) {
    console.error("PDF extraction failed:", err);
    return "";
  }
}
