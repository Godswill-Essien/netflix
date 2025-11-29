import mongoose from "mongoose"

export const connectDb= async()=>{
   try{
        //for security reasons, we will  not put our atlas connection here
        // we will use what we call environment variables
        const connection = await mongoose.connect(process.env.MONGODB_URL)

        if(connection){
           //let me know if the connection is succeessfulll 
           console.log("Db is connected")
        }

   } catch (error) {
     console.log(error.message)
   }
}                                                           