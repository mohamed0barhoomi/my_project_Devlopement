const mongoose = require("mongoose")
const  dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const Connect_DB = async()=>{
    await mongoose.connect(process.env.URI_DB)
    .then(()=>{console.log("databse connect ")})
    .catch((err)=>console.log("err databse :",err))
}

module.exports =Connect_DB