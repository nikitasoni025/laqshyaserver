import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
    
},{timestamps:true});


const admins=new mongoose.model('admins',AdminSchema);

export default admins;