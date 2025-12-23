import { connect } from "mongoose";
import { envConfig } from './index.js'

async function connectDb() {
    try {
        await connect(String(envConfig.MONGO_URI));
        console.log("Connected to database");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;