import express from "express";
import dotenv from "dotenv";
import multer from 'multer';
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();
const upload = multer({ storage: multer.memoryStorage() }); //Keep files in memory
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

app.use(express.json());
app.use(cors());

// JSearch API proxy endpoint
app.get('/api/search/jobs', async (req, res) => {
  try {
    const query = req.query.query || '';
    const page = req.query.page || 1;
    const num_pages = req.query.num_pages || 1;
    const apiKey = process.env.JSEARCH_API_KEY;
    const apiUrl = 'https://jsearch.p.rapidapi.com/search';

    const response = await axios.get(apiUrl, {
      params: {
        query,
        page,
        num_pages
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error('JSearch API error:', err);
    res.status(500).json({ error: 'Failed to fetch jobs from JSearch API.' });
  }
});

app.post('/api/upload/resume', upload.single('myFile'), async (req, res) => {
  try{
    console.log('/upload/resume API called');
    const fileBuffer = req.file.buffer; // this is a Node.js Buffer
    const fileContents = fileBuffer.toString('utf8'); // convert to string if it's text

    console.log('File contents:', fileContents);
    // Send to another API
    const response = await axios.post('http://127.0.0.1:3000/api/Gemini/LLM', {
      resume: fileContents
    });
    console.log(response.data); //Debugging
    res.json({
      message: "File sent!",
      remoteResponse: response.data.result
    });
  }catch (err){
    console.error(err);
    res.status(500).send('Failed to send file to API');
  }
});

app.post("/api/Gemini/LLM", async (req, res) => {
  try {
    console.log('/api/Gemini/LLM Called');
    const resume = req.body.resume; //Assuming this is a string
    if (!resume) {
      return res.status(400).json({ error: "Missing resume text" });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are an expert resume parsing and keyword extraction engine. Your task is to analyze the provided raw text from a resume and extract key information specifically for the purpose of matching the candidate to relevant job listings.

        Your output **must be strictly categorized** into the following four sections, and you must use a specific separator (a colon followed by a space, ': ') for section headers and use a comma-space delimiter (', ') for all list items.

        1.  **SKILLS_TECHNOLOGIES**: A comprehensive list of all technical tools, programming languages, software, and significant non-technical skills (e.g., Python, SQL, AWS, Financial Analysis, Project Management).
        2.  **JOB_TITLES_ROLES**: A list of the most prominent or recent job titles and functional roles (e.g., Senior Data Scientist, Engineering Manager, Solution Architect).
        3.  **INDUSTRY_DOMAINS**: A list of industry-specific keywords and professional domains (e.g., FinTech, E-commerce, Aerospace, Cloud Infrastructure, Regulatory Compliance).

        **[RESUME TEXT]**
          ${resume}

        **---**

        **REQUIRED OUTPUT FORMAT:**

        SKILLS_TECHNOLOGIES: [List item 1], [List item 2], [List item 3], ...
        JOB_TITLES_ROLES: [List item 1], [List item 2], [List item 3], ...
        INDUSTRY_DOMAINS: [List item 1], [List item 2], [List item 3], ...
        `,
    });
    console.log(response.text);
    const textResult = response.text;
    res.json({ result: textResult }); // Send the API response to the server
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
