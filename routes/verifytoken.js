const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err){
                return res.status(400).json("Invalid Token");
            }
            else{
                req.user = user;
                next();
            }
        })
    }
    else{
        return res.status(401).json("You are not authenticated");
    }
}

const verifyTokenandAuthorize = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(401).json("You are not allowed");
        }
    })
}

module.exports = {verifyToken,verifyTokenandAuthorize};