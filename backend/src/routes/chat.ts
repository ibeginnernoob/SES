import { Router, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import axios from "axios";

import Chat from "../models/chat";
import ResponseModel from "../models/response";
import Prompt from "../models/prompt";

const router=Router()

router.get('/chats',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId=req.userId

        const chats=await Chat.find({
            owner:userId
        },'_id, title')

        res.status(200).json({
            chats:chats
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            msg:'Something went wrong!'
        })
    }
})

router.get('/chat/:id',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId=req.userId
        const chatId=req.params.id

        const chat=await Chat.find({
            owner:userId,
            _id:chatId
        }).populate('responses prompts')

        res.status(200).json({
            chat:chat
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            msg:'Something went wrong!'
        })
    }
})

router.get('/new-chat',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId=req.userId

        const newChat=new Chat({
            owner:userId,
            prompts:[],
            responses:[]
        })
        const savedChat=await newChat.save()

        res.status(200).json({
            msg:'New chat successfully created!',
            chatId:savedChat._id
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            msg:'Something went wrong!'
        })
    }
})

router.post('/chat/:id',async (req:Request,res:Response,next:NextFunction)=>{
    const session=await mongoose.startSession();

    try{
        const chatId=req.params.id
        const prompt=req.body.prompt

        const MLResponse=await axios.post('',{
            prompt:prompt
        },{
            headers:{

            }
        })

        if(!MLResponse || MLResponse.status!==200){
            throw new Error('The ML model did not work!')
        }
        
        await session.withTransaction(async ()=>{
            const newPrompt=new Prompt({
                chat:chatId,
                prompt:prompt
            })
            const savedPrompt=(await newPrompt.save())

            await Chat.findByIdAndUpdate(chatId,{
                $push:{
                    prompts:savedPrompt._id
                }
            },
            { session })

            const newResponse=new ResponseModel({
                chat:chatId,
                response:MLResponse.data.resString
            })
            const savedResponse=await newResponse.save()

            await Chat.findByIdAndUpdate(chatId,{
                $push:{
                    responses:savedResponse._id
                }
            },
            { session })
        })

        await session.commitTransaction();
        await session.endSession();

        res.status(200).json({
            msg:'Response successfully generated, prompt and response successfully stored!'
        })
    } catch(e){
        await session.abortTransaction();
        await session.endSession();
        console.log(e)
        res.status(500).json({
            msg:'Something went wrong!'
        })
    }
})

export default router