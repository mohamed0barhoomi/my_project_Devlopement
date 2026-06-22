const express=require("express")
const pilote = require("../models/pilote_schima")
const avion = require("../models/avion_schima")
const vol = require("../models/vol_schima")
const admin = require("../models/admin_schima")


const bcrypt = require("bcrypt")
const jtw = require("jsonwebtoken")
const {validationResult}= require("express-validator")

const register_admin=async(req,res)=>{
    try{
        const err = validationResult(req)
        if(! err.isEmpty()) return res.status(400).json({mssg:"req mall formed / register",err:err})

        const {email,ID,pass}=req.body
        const find_admin=await admin.findOne({ID})
        if(find_admin) return res.status(400).json({mssg:"admin is alredy found"})

        const hashpass = await bcrypt.hash(pass,10)
        const new_admin= await admin.create({email,ID,pass:hashpass})

        const token = jtw.sign({id:new_admin._id},process.env.SC_KEY,{expiresIn:"10d"})

        return res.status(201).json({mssg:"admin was create ",token:token,admin:new_admin})
    }
    catch(err){
         return res.status(500).json({mssg:"erreur server / register admin",err:err.message})
    }
}





//controlles get 
const get_pilote = async(req,res)=>{
    try{
        const list_pilote= await pilote.find()
        res.status(200).json({mssg:"list pilote",pilote:list_pilote})
    }
    catch(err){
        res.status(500).json({mssg:"erreur server / get pilote",err:err.message})
    }
}
const get_avion = async(req,res)=>{
    try{
        const list_avion=await avion.find()
        res.status(200).json({mssg:"list avion",avion:list_avion})
    }
    catch(err){
        res.status(500).json({mssg:"erreur server / get avion",err:err.message})
    }
}
const get_vol = async(req,res)=>{
    try{
        const list_vol=await vol.find().populate("pilote_id").populate("avion_id")
        return res.status(200).json({mssg:"list vol",vol:list_vol})
    }
    catch(err){
        res.status(500).json({mssg:"erreur server / get vol",err:err.message})
    }
}
// controllers create
const create_pilote= async(req,res)=>{
    try{
    const {name,email,CIN,NP} = req.body
    const find_pilote=await pilote.findOne({NP:NP,CIN:CIN})
    if(find_pilote) return res.status(400).json({mssg:"pilote was existe"})
    const new_pilote = await pilote.create({name,email,CIN,NP})
    res.status(201).json({mssg:"pilote was create",pilote:new_pilote})
    }
    catch(err){
        res.status(500).json({mssg:"erreur server /create pilote",err:err.message})
    }
}
const create_avion = async(req,res)=>{
    try{
        const {name,capaciter,localisation}=req.body
        const find_avion=await avion.findOne({name})
        if(find_avion) return res.status(400).json({mssg:"avion was exist"})
        const new_avion=await avion.create({name,capaciter,localisation})
        res.status(201).json({mssg:"avion was create",avion:new_avion})
    }
    catch(err){
        res.status(500).json({mssg:"erreur server /create avion",err:err.message})
    }

}
const create_vol = async(req,res)=>{
    try{
        const {img,map,vil_dep,vil_arr,date_dep,time_dep,prix,pilote_id,avion_id}=req.body
        const find_vol=await vol.findOne({date_dep,pilote_id,avion_id})
        if(find_vol) return res.status(400).json({mssg:"vol was exist"})
        const new_vol=await vol.create({img,map,vil_dep,vil_arr,date_dep,time_dep,prix,pilote_id,avion_id})
        res.status(201).json({mssg:"avion was create",vol:new_vol})
    }
    catch(err){
        res.status(500).json({mssg:"erreur server /create vol",err:err.message})
    }

}



//controllers update
const update_pilote=async(req,res)=>{
   try{ 
    const id= req.params.id
    const {img,name,email,CIN,NP}=req.body
    const find_pilote=await pilote.findOne({_id:id})
    if(!find_pilote) return res.status(404).json({msg:"pilote not found to update"})
    const up_pilote = await pilote.findOneAndUpdate({_id:id},
                                                    {img:img || find_pilote.img,
                                                    name:name || find_pilote.name ,
                                                    email: email || find_pilote.email , 
                                                    CIN:CIN || find_pilote.CIN,
                                                     NP:NP || find_pilote.NP},
                                                  { new: true })
    return res.status(200).json({mssg:"pilote was update ",pilote:up_pilote})
    }
    catch(err){
        res.status(500).json({mssg:"erreur server / update pilote",err:err.message})
    }
}

const update_avion = async(req,res)=>{
    try{
    const id=req.params.id
    console.log("avion id :",id)
    const find_av=await avion.findOne({_id:id})
    if(! find_av) return res.status(404).json({mssg:"avion not found / up avion"})
    const {name,capasiter,localisation}=req.body
    const up_av = await avion.findOneAndUpdate({_id:id},
                                               {
                                                name:name || find_av.name,
                                                capasiter:capasiter || find_av.capasiter,
                                                localisation:localisation || find_av.localisation                                                                       
                                                },
                                                {new:true}
                                                )
    return res.status(201).json({mssg:"avion was update",avion:up_av})
   }
   catch(err){
    return res.status(500).json({mssg:"erreur server / up avion",err:err.message})
   }

}
const update_vol = async(req,res)=>{
    try{
    const id_vol=req.params.id
    console.log("id update :",id_vol)
    console.log("rq.body :",req.body)
    const find_vol=await vol.findOne({_id:id_vol})
    if(! find_vol) return res.status(404).json({mssg:"vol not found / up avion"})
    const {img,map,vil_dep,vil_arr,date_dep,time_dep,prix,pilote_id,avion_id}=req.body
    const up_vol = await vol.findOneAndUpdate({_id:id_vol},
                                               {img:img || find_vol.img,
                                                map:map || find_vol.map,
                                                vil_dep:vil_dep || find_vol.vil_dep,
                                                vil_arr:vil_arr || find_vol.vil_arr,                                                                      
                                                date_dep:date_dep || find_vol.date_dep,                                                                      
                                                time_dep:time_dep || find_vol.time_dep,                                                                      
                                                prix:prix || find_vol.prix,                                                                      
                                                pilote_id:pilote_id || find_vol.pilote_id,                                                                      
                                                avion_id:avion_id || find_vol.avion_id,                                                                      
                                                },
                                                {new:true}
                                                )
    return res.status(201).json({mssg:"vol was update",vol:up_vol})
   }
   catch(err){
    return res.status(500).json({mssg:"erreur server / up vol",err:err.message})
   }

}


// controllers router
const delete_pilote = async(req,res)=>{
    try{
        const id = req.params.id
        const find_pilote=await pilote.findOne({_id:id})
        if(! find_pilote) return res.status(404).json({mssg:"pilote not found / to delete"})
        await pilote.findOneAndDelete({_id:id})
        res.status(202).json({mssg:`pilote ${find_pilote.name} was deleted`})


    }
    catch(err){
        res.status(500).json({mssg:"erreur server / delete pilote",err:err.message})
    }
}
const delete_avion = async(req,res)=>{
    try{
        const id = req.params.id
        const find_avion=await avion.findOne({_id:id})
        if(! find_avion) return res.status(404).json({mssg:"avion not found / to delete"})
        await avion.findOneAndDelete({_id:id})
        res.status(202).json({mssg:`avion ${find_avion.name} was deleted`})

    }
    catch(err){
        res.status(500).json({mssg:"erreur server / delete avion",err:err.message})
    }
}
const delete_vol = async(req,res)=>{
    try{
        const id = req.params.id
        console.log("id VOL : ",id)
        const find_vol=await vol.findOne({_id:id})
        if(! find_vol) return res.status(404).json({mssg:"vol not found / to delete"})
        await vol.findOneAndDelete({_id:id})
        res.status(202).json({mssg:`vol : ${find_vol.vil_dep}  to   ${find_vol.vil_arr} was deleted`})

    }
    catch(err){
        res.status(500).json({mssg:"erreur server / delete pilote",err:err.message})
    }
}





module.exports = {register_admin,
    get_pilote,get_avion,get_vol,
    create_pilote,create_avion,create_vol,
    update_pilote,update_avion,update_vol,
    delete_avion,delete_pilote,delete_vol}

