import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
},
{
    timestamps: true,
});

const User = mongoose.model("User",Schema);
export default User;