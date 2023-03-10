import users from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tokens from "../Model/TokenModel.js";

dotenv.config();






export const register = async (req, res) => {


    const { fullname, email, phonenumber, institution, standard, password } = req.body;


    if (!fullname || !email || !phonenumber || !institution || !standard || !password) {

        return res.status(400).json({ msg: "fill all the required fields" });
    }

    try {
        const preuser = await users.findOne({ email: email });
        if (preuser) {
            return res.status(400).json({ msg: "User is Already present" });
        }
        else {

            const hashedpassword = await bcrypt.hash(password, 10);
            const uid = "CSGILQ23" + Math.random().toString(36).substring(2, 6)
            const adduser = new users({
                fullname, phonenumber, uid, email, password: hashedpassword, institution, standard,
            });

            adduser.save().then(() => {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "laqshya@csitdurg.in",
                        pass: "ahzcgcoixmgnsyma",
                    },
                });
                const mailOptions = {

                    from: "laqshya@csitdurg.in",
                    to: email,
                    subject: "Registration Successfull [Laqshya 2K23]",
                    html: `<div style="width: 90%;height: 100%;background:#1c2f4d ;padding: 25px; border-radius: 10px;font-family: sans-serif;color: white;position: relative;"><div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: url('https://ik.imagekit.io/dexo68yudb/6SSp.gif?updatedAt=1674581662620');background-size: cover;background-position: center;z-index: 1;opacity: 0.5;" ></div><div style="position: relative;z-index: 10;"><h1 style="color: white;font-family: sans-serif;">Hello <span style="color: rgb(255, 215, 57);">${fullname},</span></h1><p>Thank you for registering for the Laqshya 2K23 event hosted by CSGI Durg We are thrilled to have you join us for this exciting opportunity.</p><h2>Your registration has been confirmed, and your unique registration ID is <span style="color: rgb(255, 215, 57);">[${uid}]</span>. Please make note of this ID, as it will be required for check-in on the day of the event.</h2><p>The event will take place on <span style="color: rgb(255, 215, 57);">18th to 20th April</span> at CSGI Campus. Please plan to arrive at least 15 minutes before the start time to check in and get settled.</p><p>We have a great lineup of speakers and activities planned for the day, and we're confident that you will find it to be a valuable and inspiring experience.</p><p>If you have any questions or concerns leading up to the event, please do not hesitate to reach out to our team. We will be happy to assist you in any way we can.</p><p>Best regards,</p><p>Laqshya 2K23</p><p>CSGI Durg</p></div></div> `

                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ msg: "Email not sent" });
                    }
                    else {
                        console.log(`Email sent` + info);
                        return res.status(200).json({ msg: "Registration Successfull" });
                    }
                });


            })
        }
    } catch (error) {

        console.log(error.message);
        return res.status(400).json({ msg: "Registration Failed" });

    }

}



export const userSignin=async(req,res)=>{
    const {email,password}=req.body;

    const user=await users.findOne({email:email});
    console.log(user);

    if(!user){
        return res.status(400).json({mag:"User Not Found"});
    }

    try {
        const match= await bcrypt.compare(password,user.password);

        if(match){
            console.log("matched");
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN_KEY,{expiresIn:"15m"});
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_TOKEN_KEY);

            const addToken=new tokens({token:refreshToken});

            await addToken.save();

            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,data:{name:user.name,email:user.email}});
        }else{
            return res.status(400).json({msg:"Password Did not Matched !!"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:"Signin Failed !!"});
        
    }


}



export const fetchParticipants=async(req,res)=>{
    try {
        const participants = await users.find();
        return res.status(200).json(participants)
        
    } catch (error) {
        return res.status(400).json({msg:error.message});
    }

}