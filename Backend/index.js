import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRouter from "./routes/userRouter.js";
import chatRoutes from "./routes/chatRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";

dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if PORT is not defined

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/user', userRouter);
app.use('/api/chat', chatRoutes);

// Global error handling middleware
app.use(errorHandler); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
