import mongoose from "mongoose"

export const connectDb= async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/ecommerce`)

        console.log("connection instance:",connectionInstance.connection.host)
        

        
    } catch (error) {
        console.log(error)
        // to exit the process
        process.exit(1)
    }
}