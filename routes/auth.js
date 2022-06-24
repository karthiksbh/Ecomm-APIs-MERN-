const router = require("express").Router();
const User = require('../models/user');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register the user
router.post("/register",async(req,res)=>{

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.
        AES.encrypt(req.body.password,process.env.PASS_SEC).toString()          
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(404).json(err);
    }
});

//Login the User
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({
            username:req.body.username
        })

        if(!user){
            return res.status(404).json("Wrong creds");
        }

        const hashPass = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC)
        const passwordof = hashPass.toString(CryptoJS.enc.Utf8);

        if(passwordof!=req.body.password){
            return res.status(404).json("Wrong creds");
        }

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_SEC,
        {expiresIn:"3d"})

        const { password,...others} = user._doc;

        res.status(200).json({...others,accessToken});
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router
