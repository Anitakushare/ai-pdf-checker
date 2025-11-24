# NIYAMR-AI — PDF Rule Checker (MERN + Groq + AI)

NIYAMR-AI is an AI-powered document compliance checker.
It allows users to upload a PDF file, enter custom rules, and get AI-generated pass/fail analysis based on the PDF content.

## This project uses:

* React + Vite (Frontend)

* Node.js + Express (Backend)

* Groq LLM (Llama-3.3-70B) for rule checking

* pdf-parse for PDF text extraction

# Features

* Upload any PDF document

* Provide multiple rules to check

* AI analyzes the PDF and returns:

✔ Rule

✔ Pass/Fail

✔ Evidence

✔ Reasoning

✔ Confidence %

* Clean and modern UI

* Fully responsive

* Error handling for:

* Missing PDF

* Empty rules

* CORS issues

* Invalid JSON from AI

# Tech Stack
## Frontend

* React

* Vite

* Axios

* Tailwind CSS

## Backend

* Node.js

* Express

* Multer (File Upload)

* pdf-parse

* Groq SDK

## Installation
1. Clone the repo
git clone https://github.com/your-username/niyamr-ai-checker.git
cd niyamr-ai-checker

## Backend Setup

* Go inside backend folder:

cd backend

* Install dependencies
npm install

* Create .env
GROQ_API_KEY=your_api_key_here

* Start backend
npm start


* Backend runs on:

http://localhost:3000

## Frontend Setup

* Go inside frontend folder:

cd frontend

* Install dependencies
npm install

* Start frontend
npm run dev


* Frontend runs on:

http://localhost:5173
