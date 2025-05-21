import {generateContent} from "../services/ai_services.js";



export async function aicontrol(req,res){
    try{
        const prompt=req.query.prompt;
    const result=await generateContent(prompt);
   
    res.send(result);
    }catch(e){
       
        res.status(400).send(e.message);
    }
}