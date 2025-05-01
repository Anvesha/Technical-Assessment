// chatRoutes.js
import express from "express";
import { addConversation, createchat, deleteChat, getAllChats, getconversation } from "../Controller/chatcontroller.js";
import { isAuth } from "../middleware/isAuth.js";

const route = express.Router();

route.post("/new", isAuth, createchat);
route.get("/all", isAuth, getAllChats);
route.post("/:id", isAuth, addConversation);  // Correctly named parameter
route.get("/:id", isAuth, getconversation);   // Correctly named parameter
route.delete("/:id", isAuth, deleteChat);     // Correctly named parameter

export default route;
