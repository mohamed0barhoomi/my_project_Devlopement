const mongoose= require("mongoose")


const pilote_schima=mongoose.Schema({
    img:{type:String,default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"},
    name:{type:String,require:true},
    email:{type:String,require:true},
    CIN:{type:String,require:true},
    NP:{type:String,require:true},
})

const pilote=mongoose.model("pilote",pilote_schima)
module.exports=pilote