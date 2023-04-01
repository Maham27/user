const express = require('express');
const router = express.Router();
const user = require("../models/usermodels");
const lawyer=require('../models/lawyersmodel');
const bcrypt=require("bcryptjs");
const jsontoken=require("jsonwebtoken");
const authmidleware=require("../midleware/authenticationmiddleware");
router.post('/registration',async(req,res)=>
{
try{
  const userexist=await user.findOne({email:req.body.email})
  if (userexist)
  {
    return res.status(200).send({ message: "this user is already exist ", success:false });
  }
const password=req.body.password;
const salt=await bcrypt.genSalt(10);
const hashedpassword= await bcrypt.hash(password,salt);
req.body.password=hashedpassword;
const newuser=new user(req.body);
await newuser.save();
res.status(200).send({message:"user created",success:true});

}
catch(error)
{
  console.log(error);
  res.status(500).send({ message: "user is not  created", success: false,error });
}
});
router.post("/login", async (req, res) => {
  try {
    const userregistered = await user.findOne({ email: req.body.email });
    if (!userregistered) {
      return res
        .status(200)
        .send({ message: "this user is not exist ", success: false });
    }
    const ismatched=await bcrypt.compare(req.body.password,userregistered.password);
    if(!ismatched)
    {
      return res
        .status(200)
        .send({ message: "incorrect password", success: false});
    }
    else
    {
      const token=jsontoken.sign({id:userregistered._id},process.env.jwtsecret
        ,{
          expiresIn:"1d"
        })
 res.status(200).send({ message: "successfully login", success: true,data:token});
    }

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in login", success: false, error });
  }
});

router.post("/getuserinfobyid",authmidleware ,async(req,res)=>
{
  try {
    const userregistered = await user.findOne({ _id: req.body.userId });
    userregistered.password=undefined;
      if (!userregistered) {
        return res
          .status(200)
          .send({ message: "this user is not exist ", success: false });
      }
      else{
        res.status(200).send({
          success: true,
          data: userregistered,
        });
      }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error in user info", success: false, error });
    
  }
});

router.post("/joinasalawyer",authmidleware, async (req, res) => {
  try {
    const newlawyer=new lawyer({...req.body,status:"pending"});
    await  newlawyer.save();
    const adminuser=await user.findOne({isadmin:true});
    const unseennotifications=adminuser.unseennotifications
    unseennotifications.push({
      type:"newlawyerreq",
      message:`${newlawyer.firstname} ${newlawyer.lastname} has joined as a lawyer account`,
      data:{
        lawyerId:newlawyer._id,
        name :newlawyer.firstname + " " + newlawyer.lastname
      },
      onClickPath:'/admin/lawyers'
    })
    await user.findByIdAndUpdate(adminuser._id,{unseennotifications});
    res.status(200).send({
      success:true,
      message:"lawyer joined successfully"
    });
   } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in joining as a lawyer", success: false, error });
  }
});
router.post("/markallnotificationsasseen", authmidleware, async (req, res) => {
  try {
    const userregistered = await user.findOne({ _id: req.body.userId });
    const unseennotifications=userregistered.unseennotifications;
    const seennotifications=userregistered.seennotifications;
    seennotifications.push(...unseennotifications);

    userregistered.unseennotifications=[];
    userregistered.seennotifications=seennotifications;
    const updateduser=await userregistered.save();
    updateduser.password=undefined;
    res.status(200).send({
      success: true,
      message: "all notifications are marked",
      data:updateduser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in joining as a lawyer", success: false, error });
  }
});
router.post("/deleteallnotifications", authmidleware, async (req, res) => {
  try {
    const userregistered = await user.findOne({ _id: req.body.userId });
    const unseennotifications = userregistered.unseennotifications;
    userregistered.seennotifications = unseennotifications;
    userregistered.unseennotifications = [];
    userregistered.seennotifications = [];
    const updateduser = await user.findByIdAndUpdate(
      userregistered._id,
      userregistered
    );
    updateduser.password = undefined;
    res.status(200).send({
      success: true,
      message: "all notifications are deleted",
      data: updateduser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in joining as a lawyer", success: false, error });
  }
});
module.exports=router;