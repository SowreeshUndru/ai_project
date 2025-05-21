import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:[6,"length must be greater than 6"],
        maxlength:[50,"length must be less than 50"]
    },
    password:{
        type:String,
        required:true,
        minlength:[3,"length must be greater than 3"],
        select:false
    }
})

userSchema.statics.hashpassword=async function(password){
    return await bcrypt.hash(password,10);
}

userSchema.methods.isvalid=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generatejwt=async function(){
    return jwt.sign({email:this.email}, process.env.SECRET, { expiresIn: '24h' });
}


const user=mongoose.model("users",userSchema);

export default user;