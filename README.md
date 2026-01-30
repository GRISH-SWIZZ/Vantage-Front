🛡️ Vantage – LLM Backbone for Autonomous Cyber Resilience

Vantage is an AI-powered cybersecurity platform designed to detect malicious URLs, analyze risks, and explain threats using Machine Learning and Large Language Models.
It combines real-time threat detection with an intelligent conversational security assistant.

🚀 Live Demo & Repository

Live Demo: https://vantage.web.app

GitHub: https://github.com/GRISH-SWIZZ/Vantage

📌 What is Vantage?

Vantage acts as a security intelligence layer that helps users understand whether a URL is safe or malicious and why.
Instead of showing only alerts, Vantage focuses on explainable cybersecurity.

✨ Key Features

🔍 Real-Time URL Threat Detection
Analyze URLs instantly using a trained ML model.

🧠 LLM-Powered Cyber Analyst
Chat with an AI assistant to understand risks, reasons, and security concepts.

📊 Risk Classification
Categorizes URLs as Benign or Malicious with risk levels.

🧾 Threat History Tracking
Stores scan results for future reference.

🔐 Secure Authentication
Google & Phone authentication using Firebase.

🎬 Cinematic UI Experience
Smooth animations and dark cinematic theme for a professional feel.

🧠 How It Works

User enters a URL

Frontend sends request to Flask backend

ML model analyzes the URL

Result + risk level returned

Gemini LLM explains the threat (optional)

Data stored for history and stats

All AI logic runs on the backend.
Frontend never uses mock AI data.

🧩 Tech Stack
Frontend

React + Vite

Tailwind CSS

Framer Motion

Firebase Authentication

Firebase Hosting

Backend

Flask (REST API)

Python

Machine Learning Model

Gemini LLM (via API)

AI & ML

URL Classification Model

Gemini LLM for explanations & chatbot

📁 Project Structure
Vantage/
│
├── backend/
│   ├── app.py
│   ├── model_loader.py
│   ├── predictor.py
│   ├── gemini_service.py
│   ├── history_store.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── constants.js
│   └── package.json
│
└── README.md

🔌 API Endpoints
Method	Endpoint	Description
GET	/	Health check
POST	/predict	Scan URL
POST	/chat	Chat with AI
GET	/history	Fetch scan history
POST	/history/add	Save scan
GET	/stats	Dashboard stats
🛠️ Setup Instructions
Backend
cd backend
pip install -r requirements.txt
python app.py


Backend runs on:

http://127.0.0.1:5000

Frontend
cd frontend
npm install
npm run dev

🎯 Use Cases

Students learning cybersecurity

Developers checking suspicious links

Demonstrating AI + ML integration

Hackathons & innovation showcases

🔮 Future Enhancements

Browser extension

Advanced phishing detection

User-specific threat intelligence

Cloud-based model scaling

👨‍💻 Author

Grish Narayanan

LinkedIn: https://www.linkedin.com/in/grish-narayanan

⭐ Final Note

Vantage is built with a focus on clarity, intelligence, and trust.
Not just detecting threats, but explaining them.
