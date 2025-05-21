import redisclient from "../services/redis.js";

function profilecontrol(req,res){
    res.json({user:req.user});
}
export default profilecontrol;