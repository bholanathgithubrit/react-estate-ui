import prisma from "../lib/prisma.js"
import bcrypt from "bcryptjs"
//import {useLoaderData} from "react-router-dom"
export const getUsers=async (req,res)=>{
    try{
        const users=await prisma.user.findMany()
        res.status(201).json(users)
    }
    catch(err){
        console.log(err)
        res.status(404).json({message:"Failed to get Users"})
    }
}
export const getUser=async (req,res)=>{
    const id=req.params.id
    try{
        const user=await prisma.user.findUnique({
            where:{id}
        })
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(404).json({message:"Failed to get User"})
    }
}
export const updateUser=async (req,res)=>{
    const id=req.params.id
    const tokenId=req.userId
    console.log(id," hi ",tokenId)
    const {password,avatar,...inputs}=req.body
    if(id!==tokenId)return res.status(403).json({message:"Not Authorized"})
    let updatedPassword=null
    try{
        if(password){
            updatedPassword=await bcrypt.hash(password,10)
        }
        const updatedUser=await prisma.user.update({
            where:{id},
            data:{
                ...inputs,
                ...(updatedPassword && {password:updatedPassword}),
                ...(avatar && {avatar})
            }
        })
        const {password:userPassword,...rest}=updatedUser
        res.status(200).json(rest)
    }
    catch(err){
        console.log(err)
        res.status(404).json({message:"Failed to Update User"})
    }
}
export const deleteUser=async (req,res)=>{
    const id=req.params.id 
    const tokenUserId=req.userId 
    if(id!==tokenUserId)return res.status(404).json({"message":"Not Authorize"})
    try{
        await prisma.user.delete({where:{id}})
        res.status(201).json({message:"User deleted Successfully"})
    }
    catch(err){
        console.log(err)
        res.status(404).json({message:"Failed to delete User"})
    }
}

export const savePost=async (req,res)=>{
    const postId=req.body.postId 
    const tokenUserId=req.userId 
    console.log(postId,tokenUserId)
    try{
        const savedPost=await prisma.savedPost.findUnique({
            where:{
                userId_postId:{
                    userId:tokenUserId,
                    postId,
                }
            }
        })
        console.log(savedPost)
        if(savedPost){
            await prisma.savedPost.delete({
                where:{
                    id:savedPost.id
                }
            })
            console.log("post delete")
            res.status(201).json({message:"Post Removed from Saved List"})
        }
        else{
            await prisma.savedPost.create({
                    data:{
                        userId:tokenUserId,
                        postId
                    }
            })
            console.log("post saved")
            res.status(201).json({message:"Post  Saved"})
        }
    }
    catch(error){
        console.log(error)
        res.status(404).json({message:"Failed to save Post"})
    }
}

export const profilePosts=async (req,res)=>{
    const tokenUserId=req.params.userId
    console.log(req.params,tokenUserId)
    try{
        const userPosts=await prisma.post.findMany({
            where:{userId:tokenUserId}
        })
        const saved=await prisma.post.findMany({
            where:{userId:tokenUserId},
            include:{
                post:true
            }
        })
        const savedPosts=saved.map(item=>item.post)

        res.status(200).json({userPosts,savedPosts})
    }
    catch(err){
        console.log(err)
        res.status(404).json({message:"Failed to get profile Posts"})
    }
}