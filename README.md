# 🌿 Spiritual Sage 🧘‍♂️✨

**Spiritual Sage** is a full-stack MERN application that allows users to engage in profound and enlightening conversations with revered spiritual masters such as **Lord Krishna**, **Swami Vivekananda**, **Acharya Chanakya**, and **Gautama Buddha**. The platform delivers personalized spiritual guidance, ancient wisdom, and motivational insights using intelligent AI-powered chat interfaces.

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- JavaScript (or TypeScript)
- Axios
- Tailwind CSS (or CSS3)

### Backend:
- Node.js
- Express.js
- MongoDB
- OpenAI GPT API (or compatible LLM)

---

## ✨ Features

- 💬 Real-time chat with spiritually wise personas.
- 🧘 Receive personalized guidance on life, values, purpose, and inner peace.
- 🔒 Secure backend with environment-based configuration using `.env`.
- ⚡ Fast and responsive frontend UI built with React.
- 🌐 RESTful API integration with AI service.
- 💾 MongoDB integration for persistent storage (if enabled).

---

## 📁 Project Structure
KrishnaGPT/
├── frontend/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js / App.tsx
├── backend/ # Node.js backend
│ ├── routes/
│ ├── models/
│ └── server.js
├── README.md


---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 16.x
- MongoDB instance (local or cloud-based)
- OpenAI API key or compatible LLM setup

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/KrishnaGPT.git
cd KrishnaGPT
```

###2. Setup Backend

cd backend
npm install
cp .env.example .env


Edit .env and add:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

Then start the backend
```bash
npm run dev
```

#3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```
App will run at: http://localhost:3000

##🔄 Available Scripts

#Backend
```bash
npm run dev     # Start backend with nodemon
```
#Frontend
```bash
npm start       # Start development server
npm run build   # Build frontend for production
```

###🧘‍♀️ Chat with These Divine Entities

| Character            | Domain                            |
| -------------------- | --------------------------------- |
| 🦚 Lord Krishna      | Dharma, Karma, Bhagavad Gita      |
| 🔥 Swami Vivekananda | Vedanta, Inspiration, Motivation  |
| 🧠 Acharya Chanakya  | Strategy, Ethics, Politics        |
| ☸️ Gautama Buddha    | Peace, Mindfulness, Enlightenment |


###🤝 Contributing
Fork the repo

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request


###📫 Contact & Support
For queries, feedback, or support, please contact:
📧 zenithx996@gmail.com
