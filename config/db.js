import mongoose from "mongoose";
import { config } from "dotenv";
config()
const database = async () => {

    try{
        const connect = await mongoose.connect(process.env.DATABASE)
        console.log("---------------Connection established with database---------------\n")

    } catch(err){
        console.log(`CONNECTION ERROR \n ${err}`);
    }


}
export default database