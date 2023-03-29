import express from "express";
import dotenv from "dotenv";
import "./DataBase/db.js";
import router from "./Routes/Routes.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();


// CRATING AN EXPRESS APP
const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);
const port=process.env.PORT || 8000

// CRATONG A SERVER

app.listen(port,()=>{
    console.log("server started succesfully");
});




