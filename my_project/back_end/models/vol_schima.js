const mongoose=require("mongoose")

const vol_schima = mongoose.Schema({
    img:{type:String,default:"https://www.aljazeera.com/wp-content/uploads/2025/11/epa_692647502ed9-1764116304.jpg?resize=770%2C513&quality=80"},
    map:{type:String,default:" https://protoinfrastack.ivondy.com/images/1766041204106-t1s1dn.jpg"},
    vil_dep:{type:String,required:true},
    vil_arr:{type:String,required:true},
    date_dep:{type:Date,required:true},
    time_dep:{type:String,required:true},
    disp:{type:Number,required:true,default:0},
    prix:{type:Number,required:true},
    pilote_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"pilote"
    },
    avion_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"avion"
    }
})

const vol = mongoose.model("vol",vol_schima)
module.exports= vol


//const vols = await Vol.find()
//   .populate("pilote_id")
//   .populate("avion_id");

// console.log(vols);