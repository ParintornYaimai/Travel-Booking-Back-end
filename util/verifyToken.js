const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
    
    const token = req.cookies.accessToken;
    if(!token){
        return (
            res.status(401).json({
                success:false,
                message:"You haven't verified your identity yet."
            })
        )
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            throw err
        }else{
            req.user = decoded;
            next()
        }
    })
}

exports.verifyUser = async (req,res,next)=>{
    this.verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id && req.user.role === 'admin'){
            next()
        }else{
            res.status(401).json({
                success:false,
                message:"You are not authorized to perform this action."
            })
        }
    })
}

exports.verifyAdmin = async (req,res,next)=>{
    this.verifyToken(req,res,next,()=>{
        if(req.user.role === 'admin'){
            next()
        }else{
            res.status(401).json({
                success:false,
                message:"You are not authorized to perform this action."
            })
        }
    })
}