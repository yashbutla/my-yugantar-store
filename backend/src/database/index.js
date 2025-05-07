import mongoose from 'mongoose';  
import { DATA_BASENAME } from '../constant.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DATA_BASENAME}`);

        console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB Connection Error", error);
        process.exit(1);
    }
};

export default connectDB;
