import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRouter from "./routes/userRouter.js";
import chatRoutes from "./routes/chatRoutes.js";
import errorHandler from "./middleware/errorhandler.js";
import cors from "cors";
import path from "path"; 

dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/user', userRouter);
app.use('/api/chat', chatRoutes);

app.use(express.static(path.join(_dirname, "frontend", "dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

// Global error handling middleware
app.use(errorHandler); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
