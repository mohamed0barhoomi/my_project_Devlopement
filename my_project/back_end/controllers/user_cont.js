const express = require("express")
const user = require("../models/user_schima")
const vol = require("../models/vol_schima")
const historique = require("../models/historique")
const admin = require("../models/admin_schima")


const jtw = require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {validationResult} = require("express-validator")

const register = async(req,res)=>{
    try{
        const err = validationResult(req)
        if(! err.isEmpty()) return res.status(400).json({mssg:"req mall formed / register",err:err})

        const {name,last_name,email,NP,pass}=req.body
        const find_user = await user.findOne({email})
        if(find_user) return res.status(400).json("you alredy have an acount try login")

        const hashpass=await bcrypt.hash(pass,10)
        const new_user =await user.create({name,last_name,email,NP,pass:hashpass})

        const token = jtw.sign({id:new_user._id},process.env.SC_KEY,{expiresIn:"10d"})
        res.status(201).json({mssg:"user was create",user:new_user,token:token})

    }
    catch(err){
        res.status(500).json({mssg:"err server /register",err:err.message})
    }
}
const login = async(req,res)=>{
    try{
        const {email,pass}=req.body
        const find_user=await user.findOne({email})
        if(find_user) {
            const ver_pass= await bcrypt.compare(pass,find_user.pass)
            if(! ver_pass) return res.status(400).json({mssg:"wrong password"})
            const token=jtw.sign({id:find_user._id},process.env.SC_KEY,{expiresIn:"5d"})
            return res.status(201).json({mssg:"login succesful",user:find_user,token:token,admin:false})
            }
        else
            {
            const admin_find = await admin.findOne({email})
            if(!admin_find) return res.status(404).json({mssg:"admin not found && user not found"})
            else{
                const ver_pass=await bcrypt.compare(pass,admin_find.pass)
                if(! ver_pass) return res.status(400).json({mssg:"wrong password admin"})
                const token=jtw.sign({id:admin_find._id},process.env.SC_KEY,{expiresIn:"5d"})
                return res.status(201).json({mssg:"login succesful",user:admin_find,token:token,admin:true})
                }
            }
    }
    catch(err){
        res.status(500).json({mssg:"err server /login",err:err.message})
    }
}
const conserve_user=async(req,res)=>{
    try{
    const id=req.userId
    const user_find =await user.findOne({_id:id})
    if(!user_find) return res.status(404).json({mssg:"usernot found"})
    return res.status(200).json({user:user_find})
    }
    catch(err){
        res.status(500).json({mssg:"err server /conserve",err:err.message})
    }

}







const get_user_vol = async(req,res)=>{
    try{
        const list_vol = await vol.find().populate("pilote_id").populate("avion_id");

        res.status(200).json({mssg:"get all voll succsfull ",vol:list_vol})
    }
    catch(err){
        res.status(500).json({mssg:"err server /get user vol",err:err.message})
    }
}
//const vols = await Vol.find()
//   .populate("pilote_id")
//   .populate("avion_id");

// console.log(vols);
const reserver_vol = async (req, res) => {
  try {
    const { id } = req.params;
    const {class_type} = req.body

    const vol_find = await vol.findById(id);

    // const exist_vol = await historique.findOne({vol:{ $elemMatch: { _id: id } },owner:req.userId})


    const all = await historique.find();
    const exist_vol = all.find(h =>
    h.vol[0]._id == id && h.owner == req.userId
    );
    if(exist_vol) return res.status(400).json({mssg:"vol deja reserver"})
    const vol_up = await vol.findByIdAndUpdate(
      id,
      { disp: vol_find.disp + 1 },
      { returnDocument: "after" }
    );
   

    const user_id = req.userId;

    const vol_reserver = await historique.create({
      vol: vol_find,
      class:class_type,
      owner: user_id,
    });

    res.status(201).json({ mssg: "vol reserved",historique: vol_reserver,Vol: vol_up,});

  } catch (err) {
    res.status(500).json({mssg: "err server / reserver vol",err: err.message,});
  }
};

const get_historique=async(req,res)=>{
    try{
    const user_id=req.userId
    const hist = await historique.find({owner:user_id}).populate("owner")
    return res.status(200).json({mssg:"historique was found",historique:hist})
    }
    catch(err){
        return res.status(500).json({mssg:"errer server /get historique ",err:err.message})
    }
}
const delete_historique=async(req,res)=>{
    try{
        const {id}=req.body
        const voll=await historique.findOne({_id:id})
        await historique.findOneAndDelete({_id:id})
            const vol_up = await vol.findByIdAndUpdate(
        voll.vol[0]._id,
        { disp: vol_find.disp - 1 },
        { returnDocument: "after" }
        );
        return res.status(201).json({mssg:"vol was delete from history"})

    }
    catch(err){
        return res.status(500).json({mssg:"errer server /delete historique ",err:err.message})
    }
}
module.exports = {register,login,get_user_vol,reserver_vol,get_historique,delete_historique,conserve_user}