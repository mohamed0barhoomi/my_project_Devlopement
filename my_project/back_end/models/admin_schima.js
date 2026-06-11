const mongoose=require("mongoose")

const admin_schima=mongoose.Schema({
    email:{type:String,require:true,unique:true},
    ID:{type:String,require:true,unique:true},
    pass:{type:String,require:true},

})

const admin=mongoose.model("admin",admin_schima)

module.exports= admin