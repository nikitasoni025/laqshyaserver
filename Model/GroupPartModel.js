import mongoose from "mongoose";

const membersSchema=new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    stream: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
        default:false
    },
    password: {
        type: String,
        required: true,
    },
   
   

})



const groupPartSchema=new mongoose.Schema({
    groupname:{
        type:String,
        required:true,
    },
    groupid:{
        type:String,
        required:true,
    },
    members:[membersSchema],
    eventname:{
        type:String,
        required:true,
    },
    registrationfee:{
        type:Number,
        required:true,
    },
    status: {
        type: Boolean,
        required: true,
        default:false
    },
    selected: {
        type: Boolean,
        required: true,
        default:false
    },



});


const groups=new mongoose.model('groupparticipants',groupPartSchema);


export default groups;