import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL).then(()=>{
            console.log("Database Connected");
        })
    } catch (error) {
        console.log("Database connection failed");
    }
}