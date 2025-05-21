import user from "../models/usermodel.js";

 async function alluserscontrol(req,res){

    const loggedinuser=req.user.email;
   const  allusers=await user.find({email:{$ne:loggedinuser}},{email:1});
   if(!allusers)
       res.status(404).json({message:"no users found"});
   res.json(allusers);
}
export default alluserscontrol;