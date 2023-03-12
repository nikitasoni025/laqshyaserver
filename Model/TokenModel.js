import mongoose from "mongoose";

const TokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    }
},{timestamps:true});

const tokens=new mongoose.model('tokens',TokenSchema);

export default tokens;