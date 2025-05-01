// Backend/index.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRouter from "./routes/userRouter.js";
import chatRoutes from "./routes/chatRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// ── boilerplate to get __dirname in ESM ───────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
// ────────────────────────────────────────────────────────────────────

// 1️⃣ load .env (must happen before you reference process.env)
dotenv.config({ path: path.join(__dirname, ".env") });

// 2️⃣ verify it loaded
console.log("⛓  DB_URL      =", process.env.DB_URL);
console.log("⛓  PORT        =", process.env.PORT);
console.log("⛓  JWT_SECRET  =", process.env.jwt_sec);

// 3️⃣ initialize app
const app  = express();
const PORT = process.env.PORT || 5000;

// 4️⃣ connect to Mongo
connectDB();

// 5️⃣ middleware
app.use(express.json());
app.use(cors());

// 6️⃣ routes & static serving
app.use("/api/user", userRouter);
app.use("/api/chat", chatRoutes);
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// 7️⃣ global error handler
app.use(errorHandler);

// 8️⃣ start listening
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
