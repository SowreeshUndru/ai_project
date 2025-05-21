import { validationResult } from "express-validator";
import User from "../models/usermodel.js"; 
import redisclient from "../services/redis.js";

async function logincontrol(req, res) {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const { email, password } = req.body; 

       
        const find = await User.findOne({ email }).select("+password");

        if (!find) {
            return res.status(200).json({ error: "User not found" });
        }

        
        const isValid = await find.isvalid(password);

        if (!isValid) {
            return res.status(200).json({ error: "Invalid password" });
        }


        const token = await find.generatejwt();
       
       delete find._doc.password;
        res.json({ message: "Login successful", token,find });

    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
}

export default logincontrol;
