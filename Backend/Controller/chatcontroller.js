import { Chat } from "../models/Chat.js";
import {Conversation} from "../models/Conversation.js"

export const createchat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chat = await Chat.create({
      user: userId,
    });

    res.json(chat);
  } catch (error) {
    res.send(500).json({ message: error });
  }
};

export const getAllChats = async(req,res)=>{
    try{
        const chats = await Chat.find({user:req.user._id}).sort({
            createdAt:-1,
        });
        res.json(chats);

    }catch(error){
        res.status(500).json({message:error});
    }
}

export const addConversation=async(req,res)=>{
    try{
        const chat = await Chat.findById(req.params.id);
        console.log(chat);
        if(!chat){
           return res.status(404).json(
            {message:"no chats has been sended"}
        );
        }
        const conversation = await Conversation.create({
            chat:chat._id,
            question:req.body.question,
            answer:req.body.answer,
        })

        const updatedChat = await Chat.findByIdAndUpdate(
            req.params.id,
            {latestMessage: req.body.question},
            {new:true}
        );

        res.json({
            conversation,
            updatedChat,
        });
    }catch(error){
        res.status(500).json({message:error});
    }
}

export const getconversation = async(req,res)=>{
    try{
        const conversation = await Conversation.find({chat:req.params.id});
        if(!conversation){
            res.status(400).json({message:"No chat. Start a new one"});
        }
        res.json(conversation);
    }catch(error){
        res.status(500).json({message:error});
    }
}


export const deletechat = async (req, res) => {
    try {
        const chatId = req.params.id;

        // Find the chat by ID
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "No chat found with this ID" });
        }

        // Check if the logged-in user is authorized to delete the chat
        if (chat.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Delete the chat
        await chat.deleteOne();

        // Send success response
        res.json({ message: "Chat deleted successfully" });
    } catch (error) {
        // Log the error and return a response
        console.error("Error deleting chat:", error);
        res.status(500).json({ message: "An internal server error occurred" });
    }
};
