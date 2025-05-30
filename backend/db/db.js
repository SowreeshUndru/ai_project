
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();




function connect() {
    mongoose.connect(process.env.MONGODB_URI)
  
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(" MongoDB connection failed:", err));
}

export default connect;
