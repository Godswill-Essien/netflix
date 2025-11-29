import mongoose from "mongoose";


const DB_URI = process.env.MONGODB_URL
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
});

mongoose.connect(DB_URI!).catch(e=> {
  console.log("error connecting: ", e)
})


export default mongoose.models.User || mongoose.model("User", userSchema);


export interface User {
  type?: string;
  email: string;
  password: string;
  otp?: string; 
  isVerified: boolean;
}
