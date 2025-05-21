import user from "../models/usermodel.js";
import project from "../models/projectmodel.js";

async function addusertoproject({projectid, userid}) {
    const presentproject= await project.findOne({_id:projectid});
        if(!presentproject)
            throw new Error("project not found");
    try{
        const alreadyadded = presentproject.user.includes(userid);
        if(alreadyadded){
            console.log("user already present in the  project");
            throw new Error("user already present in the  project");
        }
        const newproject = await project.findOneAndUpdate(
            { _id: projectid },
            { $addToSet: { user: userid } }, 
            { new: true }
          );
          
          

      return newproject;
    }
    catch(err){
        throw new Error(err.message);
        
    }
   
}
export default addusertoproject;