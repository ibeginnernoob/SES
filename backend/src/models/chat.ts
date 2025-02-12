import mongoose, { Schema, model } from "mongoose";

const chatSchema = new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title:{
        type:String,
        default:""
    },
    prompts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Prompt'
    }],
    responses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Response'
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Chat=model('Chat', chatSchema);

export default Chat