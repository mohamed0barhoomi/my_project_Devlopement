const mongoose=require("mongoose")

const avion_schima=mongoose.Schema({
    name:{type:String,required:true},
    capaciter:{type:Number,required:true},
    localisation:{type:String,required:true}

})

const avion = mongoose.model("avion",avion_schima)
module.exports=avion