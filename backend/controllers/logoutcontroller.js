import redisclient from "../services/redis.js";
async function logoutcontrol(req,res){
    try{
        const token=req.cookies.token ||(req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);
        redisclient.set(token,"logout","EX",60*60*24);
        res.status(200).json({message:"logged out successfully"});
    }catch(e){
        res.status(500).json({message:"logged out failed"});
    }
}
export default logoutcontrol;