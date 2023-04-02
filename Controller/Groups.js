import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import groupValidationSchema from "../Validation/Groupvalidation.js";
import groups from "../Model/GroupPartModel.js";



dotenv.config();



export const groupRegister = async (req, res) => {


    const { groupname, members, eventname, eventid, registrationfee, status } = req.body;

    const validatedata = { groupname };
    const { error, value } = groupValidationSchema.validate(validatedata);

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ msg: "Validation Error !!", valerror: errors })
    }

    try {

        const prerefistered = await groups.findOne({ groupname: groupname, eventname: eventname });
        if (prerefistered) {
            return res.status(400).json({ msg: "You Have Already Registered For This Event" });
        }

        let groupid = `CSGI/LAQ23/${eventid}/` + Math.random().toString(36).substring(2, 6);
        const addgroups = new groups({
            groupname, groupid, members, eventname, registrationfee, status
        });

        const appPassword = process.env.APP_PASSWORD;

        addgroups.save().then(() => {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "laqshya@csitdurg.in",
                    pass: appPassword,
                },
            });
            const mailOptions = {

                from: "laqshya@csitdurg.in",
                to: members[0].email,
                subject: "Registration Successfull [Laqshya 2K23]",
                html: `<div style="width: 90%;height: 100%;background:#1c2f4d ;padding: 25px; border-radius: 10px;font-family: sans-serif;color: white;position: relative;"><div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: url('https://ik.imagekit.io/dexo68yudb/6SSp.gif?updatedAt=1674581662620');background-size: cover;background-position: center;z-index: 1;opacity: 0.5;" ></div><div style="position: relative;z-index: 10;"><h1 style="color: white;font-family: sans-serif;">Hello <span style="color: rgb(255, 215, 57);">${members[0].fullname},</span></h1><p style="color:white;">Thank you for registering Your Group <span style="color: rgb(255, 215, 57);">${groupname},</span> for the Laqshya 2K23 in <span style="color: rgb(255, 215, 57);">${eventname},</span> hosted by CSGI Durg We are thrilled to have you join us for this exciting opportunity.</p><h2>Your registration has been confirmed, and your unique Group registration ID is <span style="color: rgb(255, 215, 57);">[${groupid}]</span>. Please make note of this ID, as it will be required for check-in on the day of the event.</h2><p style="color:white;">The event will take place on <span style="color: rgb(255, 215, 57);">18th to 20th April</span> at CSGI Campus. Please plan to arrive at least 15 minutes before the start time to check in and get settled.</p><p style="color:white;">We have a great lineup of speakers and activities planned for the day, and we're confident that you will find it to be a valuable and inspiring experience.</p><p style="color:white;">If you have any questions or concerns leading up to the event, please do not hesitate to reach out to our team. We will be happy to assist you in any way we can.</p><p style="color:white;">Best regards,</p><p style="color:white;">Laqshya 2K23</p><p style="color:white;">CSGI Durg</p></div></div> `

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

    } catch (error) {

        console.log(error.message);
        return res.status(400).json({ msg: "Registration Failed" });

    }

}

export const getAllGroup = async (req, res) => {

    const limit = req.query.limit || 5;
    const page = req.query.page;
    const status = req.query.status || false;
    const selected = req.query.selected || false

    const startIndex = (page - 1) * limit;
    console.log(limit);
    try {
        const count = await groups.countDocuments();
        const groupsData = await groups.find({ status: status, selected: selected }).skip(startIndex).limit(limit);
        return res.status(200).json({ data: groupsData, totalCount: count });
    } catch (error) {
        return res.status(400).json({ msg: "Fetching Failed", error: error.message });
    }
}

export const deleteGroup = async (req, res) => {
    console.log(req.params.id);
    try {
        const group = await groups.findById(req.params.id);
        console.log(group);

        if (group) {
            await group.deleteOne();
            return res.status(200).json({ msg: "Group Deleted" });
        } else {
            return res.status(400).json({ msg: "Group Not Found" });

        }
    } catch (error) {
        console.log(error);

        // return res.status(400).json({msg:"Deletion Failed From The Server",error:error.message});
    }

}

export const updateGroup = async (req, res) => {
    console.log(req.query);
    try {
        const userid = req.query.id;
        const updateData = req.query.updateData;
        console.log(updateData);

        const result = await groups.findByIdAndUpdate(userid, updateData, { new: true });
        if (!result) {
            return res.status(400).json({ msg: "User not Found" });
        }

        return res.status(200).json({ msg: 'Uspades', result: result });

    } catch (error) {
        return res.status(400).json({ msg: 'Uspades Falotro' });

    }


}


export const getAllGroupsWithUser = async (req, res) => {
    const id = req.query.id;
    try {

        const groupsPresent = await groups.find({members: { $elemMatch: { _id: id } }});
        return res.status(200).json(groupsPresent);

    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

