const jtw = require("jsonwebtoken")



module.exports.middlware= async(req,res,next)=>{
   try{
    const token= req.headers.token
    if(!token) return res.status(203).json({mssg:"token not found " })
    const token_ver = jtw.verify(token,process.env.SC_KEY)
    req.userId=token_ver.id
    next()
    }
    catch(err){
            return res.status(401).json({mssg: "Token invalid or expired",});
    }
    
}
