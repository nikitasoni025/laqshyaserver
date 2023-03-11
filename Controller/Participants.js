import users from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";






export const register = async (req, res) => {


    const { fullname, email, phonenumber, institution, standard, password } = req.body;


    if (!fullname || !email || !phonenumber || !institution || !standard || !password) {   

        return res.status(400).json({ msg: "fill all the required fields" });     
    }

    try {
        const preuser = await users.findOne({ email: email });
        if (preuser) {
          return  res.status(400).json({ msg: "User is Already present" });
        }
        else {

            const hashedpassword = await bcrypt.hash(password, 10);
            const uid = "LAQ" + Math.random().toString(36).substring(2, 6)
            console.log(uid);
            const adduser = new users({
                fullname,phonenumber, uid, email, password: hashedpassword, institution, standard,
            });

            adduser.save().then(() => {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "animeshverma161@gmail.com",
                        pass: "Av701049300",
                    },
                });
                const mailOptions = {

                    from: "animeshverma161@gmail.com",
                    to: email,
                    subject: "Registration Successfull [Laqshya 2K23]",
                    text: `Hello ${fullname}, \n\n You have successfully registered for Laqshya2K23 with the following ID: ${uid} \n\n This is one time generated Id it will be used for your authentication purpose for Laqshya2K23, keep it safe `

                };

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({msg:"Email not sent"});
                    }
                    else{
                        console.log(`Email sent` + info);
                        return res.status(200).json({msg:"Registration Successfull"});
                    }
                });


            })
        }
    } catch (error) {

        console.log(error.message);
        return res.status(400).json({msg:"Registration Failed"});

    }

}