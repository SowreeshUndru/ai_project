

import allprojects from "../services/allprojectsservice.js";
import usermodel from "../models/usermodel.js";

async function allprojectscontrol(req, res) {
    try {
        const loggedinuser = req.user.email;
       const user = await usermodel.findOne({ email: loggedinuser });
        if (!user) return res.status(404).json({ error: "user not found" });
        const allproject = await allprojects({ userid: user._id })
        console.log(allproject);
        
        return res.status(200).json({ allproject });

    }
    catch (err) {
        console.log("error");
        console.log(err);
       
        res.status(400).json({ error: err.message });
    }
}
export default allprojectscontrol;