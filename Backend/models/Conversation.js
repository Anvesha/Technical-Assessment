import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        chat:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            require: true,
        },
        question:{
            type: String,
            require: true
        },
        answer:{
            type: String,
            require: true
        },
    },
    {
        timestamps: true,
    }
);

export const Conversation = mongoose.model("Conversation",schema);