 
const jwt=require('jsonwebtoken')


module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,process.env.secretkey)
        req.decoded=decoded
        next() 
    }
    catch(err){
        return res.status(401).json({
            status:'Auth Failed'
        })
    }
    
}