import mongoose from "mongoose";





const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    picture:[String],
    username:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imgkey:{
        type:String,
        required:true
    },
},{timestamps:true});


const posts=new mongoose.model('posts',postSchema);

export default posts;