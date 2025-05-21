import express from 'express';
const router=express.Router();
import {aicontrol} from "../controllers/ai_controller.js";
import {generateContent} from "../services/ai_services.js";

router.get("/ai_content",aicontrol);
export default router;