import { validationResult } from "express-validator";
import createproject from "../services/createproject.js";
import project from "../models/projectmodel.js";
import user from "../models/usermodel.js";

 async function projectcontrol(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
          
        const {name}=req.body;
        const cur_user=await user.findOne({email:req.user.email});
        const newproject=await createproject({name,userid:cur_user._id});
        res.status(201).json({project:newproject});
    } 
    catch (err) {

       res.status(400).json({ error: err.message });
    }
}

export default projectcontrol;