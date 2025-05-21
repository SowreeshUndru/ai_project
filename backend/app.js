import express from "express";
import morgan from "morgan";
import connect from "./db/db.js"
import userrouter from "./routes/user_router.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import projectrouter from "./routes/project.js";
import ai_router from "./routes/ai_router.js";
connect();
const app=express();
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/users",userrouter);
app.use("/projects",projectrouter);
 app.use("/ai",ai_router);
app.get("/",function(req,res){
    res.send("hello");
});


export default app;