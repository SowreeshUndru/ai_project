import express from "express";
const router = express.Router();
import { body } from "express-validator";
import usercontrol from "../controllers/usercontroller.js";
import logincontrol from "../controllers/loginController.js";
import profilecontrol from "../controllers/profileController.js";
import userautharization from "../middleware/authorization.js";
import logoutcontrol from "../controllers/logoutcontroller.js";
import alluserscontrol from "../controllers/allusercontoller.js";
import user from "../models/usermodel.js";

router.post("/register",
    body("email").isEmail().withMessage("invalide mail"),
    body("password").isLength({ min: 3, max: 50 }).withMessage("must contain atleast 6 characters"),
    usercontrol);



router.post("/login", body("email").isEmail().withMessage("invalid  email")
    , body("password").isLength({ min: 3, max: 50 }).withMessage("length must be less than 50 and greater than 3"),
    logincontrol);


router.get("/profile",userautharization,profilecontrol);


router.get("/logout",userautharization,logoutcontrol);

router.get("/allusers",userautharization,alluserscontrol);



/////////////////////////////////////////////


router.get("/search", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.json([]);
  
    try {
      const users = await user.find({
        $or: [
          { email: { $regex: query, $options: "i" } }, 
          { username: { $regex: query, $options: "i" } }, 
        ],
      }).limit(10); 
  
      res.json(users);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  export default router;