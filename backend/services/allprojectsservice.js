import projectmodel from "../models/projectmodel.js";
import usermodel from "../models/usermodel.js";

async function allprojects({ userid }) {
    if (!userid) {
        throw new Error('User ID is required');
    }
    
    // ✅ FIX: Populate the correct field "user"
    const allprojects = await projectmodel.find({ user: userid }).populate("user", "email");

    return allprojects;
}

export default allprojects;
