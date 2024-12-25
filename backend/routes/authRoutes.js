const express = require("express");
const User=require("../models/User");
const jwt=require("jsonwebtoken");
const router=express.Router();



router.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    try{
        const existingUser =await User.findOne({username});
        if (existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser=new User({username,password});
        await newUser.save();
        const token = jwt.sign({userId : newUser. id },process.env.JWT_SECRETKEYA,{expiresIn:'1h'});
        res.status(201).json({token});
        
    }
    catch(error){
        res.status(500).json({message:"Server error"})    
    }
});

router.post("/login",async (req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username});
        if (!user){
            res.status(400).json({message:"User not found"})
        }
        const isMatch=await user.comparePassword(password)
        if (!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token=jwt.sign({userId:user. _id },process.env.JWT_SECRETKEYA,{expiresIn:"1h"});
        res.json({token});


    }
    catch (error){
       res.status(500).json({message:"Server Error"});
    }
})

module.exports=router;