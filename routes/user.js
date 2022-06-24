const user = require("../models/user");
const { verifyTokenandAuthorize } = require("./verifytoken");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

// Updating the user details
router.put("/:id",verifyTokenandAuthorize,async(req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()       
        try{
            const updatedUser = await user.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{new:true})

            return res.status(200).json(updatedUser);
        }
        catch(err){
            return res.status(400).json(err);
        }

    } 
})

// Deleting the user details
router.delete("/:id",verifyTokenandAuthorize,async(req,res)=>{
    if(req.body.password){     
        try{
            await User .findByIdAndDelete(req.params.id);
            res.status(200).json("User Deleted");

            return res.status(200).json(updatedUser);
        }
        catch(err){
            return res.status(400).json(err);
        }
    } 
})

module.exports = router