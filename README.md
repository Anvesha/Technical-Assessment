# MERN Stack Analyser Application

## Overview
This project is a Analyser Application built using the MERN stack (MongoDB, Express, React, Node.js). It is designed to simulate a conversational, providing interactive, real-time responses to user queries and many more. Since I have tried my best to implement pdf reader technology but due to time constrain I am not able to implement it yet but if I got some more time to complete this project then I will make sure to do that part too...

Other than that we can take the text of the pdf and analyser will analyse the text and give out the useful result;

---

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Real-Time Communication**: Chat-like interface with instant responses.
- **AI-Powered Responses**: Integration with AI models for generating replies.
- **Database Management**: MongoDB for storing user data and chat history.
- **Error Handling**: Robust error handling and validation.
- **Responsive Design**: User-friendly UI optimized for all devices.

---

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- Node.js (v14 or later)
- MongoDB (local or cloud-based)
- npm

---

## Installation
### 1. Clone the Repository
```bash
git clone https://github.com/Anvesha/Technical-Assessment
```

### 2. Install Dependencies
#### Backend
```bash
cd Backend
npm install
```

#### Frontend
```bash
cd ../Frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `Backend` directory and add the following:
```
PORT = 5000
DB_URL = mongodb+srv://anvesharanju17:anvesha@cluster0.883h0.mongodb.net/
DB_PASSWORD = anvesha

#mail values
GMAIL_USER=anvesharanju17@gmail.com
GMAIL_PASSWORD=kxbcduhxhpixzjcw

#JSON Web token
ACTIVATION_SECRET=ahsjkxhukashxusxh
jwt_sec=hgjhgjhgjhghjghjggj
```

---

## Usage
### 1. Start the Backend Server
```bash
cd Backend
npm start
```

### 2. Start the Frontend
```bash
cd Frontend
npm start
```

### 3. Access the Application
Open your browser and navigate to `http://localhost:5000`.

---

## Project Structure
```
mern-Analyser-app/
├── Backend/
│   ├── controller/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── assets/
│   ├── public/
│   └── package.json
└── README.md
```

---

## Deployment
### Using Render (Free Hosting)
1. Deploy the backend:
   The project can be accessed using http://localhost:5000.
   https://technical-assessment-6-i0hk.onrender.com/
   (PROJECT LIVE LINK).
   This project is deployed on Render website so it will take more time then usual to send the otp to the entered mail id.

---

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: Google Gemini
- **Authentication**: JWT

---


