import {Router} from 'express';
import userautharization from '../middleware/authorization.js';
import { body } from 'express-validator';
import projectcontrol from '../controllers/projectcontroller.js';
import allprojectscontrol from '../controllers/allprojectscontroller.js';
import addusertoprojectcontrol from '../controllers/addusertoprjectcontroller.js';
const router = Router();

router.post('/createproject',
    userautharization,body("name").isString().withMessage("name should be string"),
    projectcontrol); 

router.get('/allprojects',userautharization,allprojectscontrol);


router.put("/add-project",
    body("userid").notEmpty().withMessage("userid is required for collaboration"),
userautharization,addusertoprojectcontrol);



  


export default router;


