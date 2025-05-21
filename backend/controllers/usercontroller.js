import user from "../models/usermodel.js";
import createuser from "../services/createuser.js";
import { validationResult } from "express-validator";
import redisclient from "../services/redis.js";

 async function usercontrol(req,res){
    const error=validationResult(req);
    if(!error.isEmpty()){
        console.log(error.array());
        return res.status(400).json({errors:error.array()})
    }
    try{
        const user=await createuser(req.body);
        const token=await user.generatejwt();
        delete user._doc.password;
        res.status(200).json({token,user})
      
    }
    catch(err){
        res.status(400).send(err)
    }
}
export default usercontrol;



