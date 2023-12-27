import express from 'express'
import morgan from 'morgan';
import { config } from "dotenv";
import connect_database from './config/db.js';
import {authRouter, userRouter} from './routes/index.js';

const app= express();

//middlewares
connect_database(); // connection database
config() //config for env files
app.use(morgan('tiny')) //to be removed in production, only used in development phase
app.use(express.json());  //used to parse json data into string data

// Routes
app.use('/api/v1/user/',userRouter)
app.use('/api/v1/auth/',authRouter)


app.get('/',(req,res)=>{
    res.send("Hello Server, send me some data");
})

app.get('/post',(req,res)=>{
    res.send("Posts")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server Listeing on Port ${process.env.PORT}`);
})