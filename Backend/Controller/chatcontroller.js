import { Chat } from "../models/Chat.js";
import { Conversation } from "../models/Conversation.js";
import mongoose from 'mongoose';



export const createchat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chat = await Chat.create({
      user: userId,
    });

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: "No chat has been sent" });
    }

    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );

    res.json({
      conversation,
      updatedChat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getconversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({ chat: req.params.id });
    if (conversation.length === 0) {
      return res.status(400).json({ message: "No chat. Start a new one" });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteChat = async (req, res) => {
    try {
      const chatId = req.params.id;
      
  
      // Check if the chatId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({ message: "Invalid chat ID." });
      }
  
      // Find the chat to be deleted
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: "No chat found with this ID" });
      }
  
      // Check if the user is the one who created the chat
      if (chat.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      // Delete the chat
      await chat.deleteOne();
  
      res.json({ message: "Chat deleted successfully" });
    } catch (error) {
      console.error("Error deleting chat:", error);
      res.status(500).json({ message: "An internal server error occurred" });
    }
  };