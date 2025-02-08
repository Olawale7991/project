import mongoose from "mongoose";

const connectDB = async (req, res)=> {
    try {     
        mongoose.connection.on('connected', ()=> {
            console.log('Database connected');
            
        })
        await mongoose.connect(`${process.env.mongoDB_URL}/e-commerce`);
        
    } catch (error) {
        console.log(error); 
        res.json({success:false, message:error.message})
      
    }
}


export default connectDB;