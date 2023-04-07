import users from '../Model/UserModel.js';
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
import dotenv from 'dotenv';


dotenv.config();

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await users.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }


        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        user.resetPasswordOTP = otp;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "laqshya@csitdurg.in",
                pass:process.env.APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: 'laqshya@csitdurg.in',
            to: email,
            subject: 'Reset your password',
            text: `Your OTP is ${otp}. Please use this to reset your password.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(400).json({ msg: 'Failed to send email' });
            }
            console.log(`Email sent: ${info.response}`);
            res.status(200).json({ msg: 'OTP sent to email' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }

}


export const resetPassword=async(req,res)=>{

    try {
        const { email, otp, newPassword } = req.body;
        const user = await users.findOne({ email });
    
        if (!user) {
          return res.status(400).json({ msg: 'User not found' });
        }
    
        if (user.resetPasswordOTP !== otp) {
          return res.status(400).json({ message: 'Invalid OTP' });
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordOTP = '';
        await user.save();
    
        res.status(200).json({ message: 'Password reset successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }


}