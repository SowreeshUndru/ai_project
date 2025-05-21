import user from "../models/usermodel.js";

async function createuser({email,password}){
      if(!password||!email){
        throw new Error("password and email is required")
        
      }
       const hashedpassword=await user.hashpassword(password)
      const newuser=await  user.create({
        email,
        password:hashedpassword
      });
      return newuser;
}

export default createuser;
