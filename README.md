<div align="center">

# 🎙️ EchoWrite

### Fast, Accurate, and Effortless Audio Transcription

*Transform your voice into text with AI precision*

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Groq API](https://img.shields.io/badge/Groq-API-orange?style=for-the-badge)](https://groq.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Deploy](#-deploy-to-render)

</div>

---

## 🌐 Live Demo

### 🚀 **[Try EchoWrite Live →](https://echowrite-fm1v.onrender.com)**

> **Note:** Hosted on Render's free tier. First request may take 30-60 seconds to wake up.

---

## 📖 About

**EchoWrite** is a modern web application that converts audio files into text using AI-powered transcription. Built with Spring Boot and powered by Groq's lightning-fast API, it delivers accurate transcriptions in seconds.

---

## 💡 Use Cases

- 🎤 **Meeting Transcription** - Convert meeting recordings into text documents
- 🎓 **Lecture Notes** - Transform lecture recordings into study material  
- 📞 **Interview Documentation** - Transcribe interviews for articles and reports
- 🎙️ **Podcast Notes** - Generate show notes from podcast episodes

---

## 🎯 Features

- 🎤 **Audio Upload** - Drag & drop or browse (MP3, WAV, M4A, etc.)
- 🤖 **AI Transcription** - Powered by Groq API with Whisper model
- 📋 **Copy to Clipboard** - One-click copy with success feedback
- 💾 **Download as TXT** - Export transcriptions instantly
- 🌓 **Dark/Light Mode** - Beautiful UI with theme toggle
- 📱 **Fully Responsive** - Works on desktop and mobile
- ⚡ **Lightning Fast** - Get results in seconds

---

## 🖼️ Demo

![EchoWrite Interface](https://raw.githubusercontent.com/simran-bakshi/echowrite/main/screenshots/home.png)


*EchoWrite supports both Dark and Light modes for comfortable viewing*

---

## 🛠️ Tech Stack

**Backend:** Spring Boot 3.x • Groq API • Maven  
**Frontend:** React 18 • Vite • Axios • CSS3

---

## 📦 Installation

### Prerequisites
- Java 17+ 
- Node.js 18+
- Maven 3.8+
- Groq API key ([Get here](https://console.groq.com/keys))

### Quick Start

**1. Clone & Setup**
```bash
git clone https://github.com/YOUR_USERNAME/echowrite.git
cd echowrite
```

**2. Add API Key**
```bash
# Create .env file in root directory
echo "GROQ_API_KEY=your_groq_api_key_here" > .env
```

**3. Run Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

**4. Run Frontend**
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

**5. Open Browser** → `http://localhost:5173` 🎉

---



## 🚀 Usage

1. Upload an audio file (drag & drop or click)
2. Click "Start Transcription"
3. Wait a few seconds
4. Copy or download your transcription!

**Supported formats:** MP3, WAV, M4A, FLAC, OGG, WEBM

---

## 📂 Project Structure

```
echowrite/
├── backend/
│   ├── src/main/java/
│   └── pom.xml
├── frontend/
│   ├── src/
│   └── package.json
├── screenshots/
│   └── app-demo.png
├── .env
└── README.md
```

---

## 🤝 Contributing

Contributions welcome! Fork the repo and submit a pull request.

---

## 📝 License

- This project is licensed under the MIT License.
- You are free to use, modify, and share the code.

---

## 📧 Contact

**Simran Kaur Bakshi** – [LinkedIn](https://www.linkedin.com/in/simran-kaur-bakshi-141228289/) – simsbakshi9@gmail.com

**Project Link:** [https://github.com/simran-bakshi/echowrite](https://github.com/simran-bakshi/echowrite)


---

<div align="center">

Made with ❤️ and ☕

⭐ Star this repo if you found it helpful!

</div>
