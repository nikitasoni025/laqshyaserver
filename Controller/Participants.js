import users from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tokens from "../Model/TokenModel.js";
import userValidationSchema from "../Validation/Uservalidation.js";
// import validateUsers from "../Validation/Uservalidation.js";

dotenv.config();






export const register = async (req, res) => {


    const { fullname, email, phonenumber, institution, standard, password, confirmPassword } = req.body;

    const validatedata = { fullname, email, phonenumber, password, institution, standard, confirmPassword };
    const { error, value } = userValidationSchema.validate(validatedata);

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ msg: "Validation Error !!", valerror: errors })
    }

    try {
        const preuser = await users.findOne({ email: email });
        if (preuser) {
            return res.status(400).json({ msg: "User is Already present" });
        }
        else {

            const hashedpassword = await bcrypt.hash(password, 10);
            const uid = "UID" + Math.random().toString(36).substring(2, 6)
            const adduser = new users({
                fullname, phonenumber, uid, email, password: hashedpassword, institution, standard,
            });

            adduser.save();
            return res.status(200).json({ msg: "Registered Successfully" });

        }
    } catch (error) {

        console.log(error.message);
        return res.status(400).json({ msg: "Registration Failed" });

    }

}



export const userSignin = async (req, res) => {
    const { email, password } = req.body;

    const user = await users.findOne({ email: email });
    console.log(user);

    if (!user) {
        return res.status(400).json({ mag: "User Not Found" });
    }

    try {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            console.log("matched");
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_KEY, { expiresIn: "15m" });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_KEY);

            const addToken = new tokens({ token: refreshToken });

            await addToken.save();

            return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, data: { id: user._id, name: user.fullname, email: user.email, phonenumber: user.phonenumber, institution: user.institution, standard: user.standard } });
        } else {
            return res.status(400).json({ msg: "Password Did not Matched !!" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Signin Failed !!" });

    }


}



export const fetchParticipants = async (req, res) => {
    let email = req.query.email;

    let participants;
    try {
        if (email) {
            participants = await users.find({ email: { $regex: `^${email}` } });

        } else {
            participants = await users.find();
        }
        return res.status(200).json(participants);

    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }

}



export const fetchParticipantsWithId = async (req, res) => {
    const id = req.query.id;
    try {

        const participant = await users.findById(id);
        return res.status(200).json(participant);

    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }

}