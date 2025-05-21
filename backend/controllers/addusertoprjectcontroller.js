import project from "../models/projectmodel.js";
import user from "../models/usermodel.js";
import addusertoproject from "../services/addusertoproject.js";
import mongoose from "mongoose";

async function   addusertoprojectcontrol(req,res){
    const {userid,projectid} = req.body;
            if(!userid || !projectid){
                return res.status(400).json({message:"userid and projectid are required"});
            }
            if(mongoose.Types.ObjectId.isValid(userid)===false || mongoose.Types.ObjectId.isValid(projectid)===false){
                return res.status(400).json({message:"userid and projectid should be valid"});
            }
        
    try{
     const projectafteradd=await addusertoproject({projectid,userid});
    
     res.status(200).json({message:"user added to project",projectafteradd});
    }
    catch(err){
        res.status(200).json({errmessage:err.message});
    }
    
 }

 export default addusertoprojectcontrol;