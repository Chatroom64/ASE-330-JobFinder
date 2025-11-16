import express from "express";
import dotenv from "dotenv";
import multer from 'multer';
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

dotenv.config();
const app = express();
const upload = multer({ storage: multer.memoryStorage() }); //Keep files in memory
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

app.post('/api/upload/resume', upload.single('myFile'), async (req, res) => {
  try{
    console.log('/upload/resume API called');
    const fileBuffer = req.file.buffer; // this is a Node.js Buffer
    const fileContents = fileBuffer.toString('utf8'); // convert to string if it's text

    console.log('File contents:', fileContents);
    // Send to another API
    const response = await axios.get('http://127.0.0.1:3000/api/Gemini/LLM', {
      content: fileContents
    });
    res.send(`File sent! Remote API responded: ${response.data}`);
  }catch (err){
    console.error(err);
    res.status(500).send('Failed to send file to API');
  }
});

app.get("/api/Gemini/LLM", async (req, res) => {
  try {
    console.log('/api/Gemini/LLM Called');
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words",
    });
  console.log(response.text);
    const data = await response.json()
    res.json(data); // Send the API response to the client
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
