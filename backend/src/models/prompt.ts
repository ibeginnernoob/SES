import mongoose, { Schema, model } from "mongoose";

const promptSchema = new Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat'
    },
    askedAt:{
        type:Date,
        default:Date.now()
    },
    prompt:{
        type:String,
        required:true
    }
});

const Prompt=model('Prompt', promptSchema);

export default Prompt