const mongoose = require("mongoose")


const historique_shima=mongoose.Schema({
    date:{type:Date,default:new Date()},
    vol:Array,
    class:{type:String},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

const historique = mongoose.model("historique",historique_shima)
module.exports = historique