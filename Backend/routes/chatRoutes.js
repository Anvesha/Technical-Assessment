import express from "express";
import { addConversation, createchat, deletechat, getAllChats, getconversation } from "../Controller/chatcontroller.js";
import { isAuth } from "../middleware/isAuth.js";

const route = express.Router();

route.post("/new",isAuth,createchat);
route.get("/all",isAuth,getAllChats);
route.post("/:id",isAuth,addConversation);
route.get("/:id",isAuth,getconversation);
route.delete("/:id",isAuth,deletechat);

export default route;