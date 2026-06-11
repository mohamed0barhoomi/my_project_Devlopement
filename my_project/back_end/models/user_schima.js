const mongoose =require("mongoose")




const user_schima = mongoose.Schema({
    name:{type:String,required : true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    NP:{type:String,required:true},
    pass:{type:String,required:true}
    
})

const user = mongoose.model("user",user_schima)
module.exports = user