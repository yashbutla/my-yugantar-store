import connectDB from './database/index.js';
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({
    path: './env'
});

const connectDatabase = async () => {
    try {
        await connectDB(); 

        app.listen(process.env.PORT || 10000, () => {
            console.log(`⚙️  Server is running at port: ${process.env.PORT}`);
        });
    } catch (err) {
        console.log("MONGO DB connection failed !!! ", err);
    }
};


connectDatabase();
