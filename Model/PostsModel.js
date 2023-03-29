import mongoose from "mongoose";


const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
},{timestamps:true});


const posts=new mongoose.model('posts',postSchema);

export default posts;