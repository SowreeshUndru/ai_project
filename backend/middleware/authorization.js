import jwt from "jsonwebtoken";
import redisclient from "../services/redis.js";

async function
    userautharization(req, res, next) {

    try {

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).send({ error: 'please authenticate' });
        const isblacklisted=await redisclient.get(token);
        if(isblacklisted){
            res.cookie("token","");
            return res.status(401).send({error:"token black listed"});
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();

    } 
    catch (err) {

        console.log(err);
        res.status(400).json({ error: "invalid user access" });

    }
}

export default userautharization;