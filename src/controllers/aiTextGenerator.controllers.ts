import { Request, Response } from "express";
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const colorGenerator = async (req: Request, res: Response) => {
  try {
    const { brandColor } = req.body;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 150,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      {
        text: "Generate from the given color an array of strings with hexadecimal format of other associated colors, just give me the brackets and the string elements inside, said array must have 15 related colors intended to be used on a website. It is essential that these colors harmonize well and that no more than 3 types of colors are used. The colors should be organized as follows: \n// Navbar \n1st color: Navbar background \n2nd color: Navbar foreground \n// Banner section \n3rd color: Title (h1) color \n4th color: Text color for an h2 adjacent to the h1 \n5th color: Banner background color transitioning from the h1 to the h2 backgrounds \n// About section\n 6th color: Section background \n7th color: Section text foreground \n8th color: Button background within the section \n9th color: Button foreground \n// Experiences section  \n10th color: Section background  \n11th color: Section h1 color  \n// Tickets section  \n12th color: Section background \n13th color: Section h1 color \n14th color: Button color \n15th color: Button foreground color;",
      },
      { text: "input: #333333" },
      {
        text: 'output: ["#000000", "#FFFFFF", "#333333", "#666666", "#F3F3F3", "#FFFFFF", "#333333", "#000000", "#FFFFFF", "#F3F3F3", "#333333", "#FFFFFF", "#333333", "#000000", "#FFFFFF"]',
      },
      { text: "input: #17004b" },
      {
        text: 'output: ["#17004b", "#ffffff", "#ffffff", "#7fa8e7", "#0f0033", "#ffffff", "#0f0031", "#17004b", "#FFFFFF", "#90abff", "#17004b", "#FFFFFF", "#17004b", "#17004b", "#FFFFFF"]',
      },
      { text: "input: #41ce16" },
      {
        text: 'output: ["#0e3103", "#95f378", "#44e713", "#41ce16", "#0b2802", "#ccffbd", "#0e3103", "#0e3103", "#a6f08f", "#0e3103", "#95f378", "#ccffbd", "#0e3103", "#0e3103", "#95f378"]',
      },
      { text: "input: #41ce16" },
      {
        text: 'output: ["#95f378", "#0e3103", "#0e3103", "#0e3103", "#b5ff9c", "#b5ff9c", "#0e3103", "#0e3103", "#a6f08f", "#0e3103", "#95f378", "#bcffa7", "#0e3103", "#0e3103", "#95f378"]',
      },
      { text: `input: ${brandColor}` },
      { text: "output: " },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = await result.response;
    const text = response.text();

    res.status(200).json(text);
  } catch (error) {
    return res.status(500).json({ error: "Unexpected server error" });
  }
};
