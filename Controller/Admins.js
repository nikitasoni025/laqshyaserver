import admins from "../Model/Adminmodel.js";
import adminValidationSchema from "../Validation/Adminvalidation.js";
import bcrypt from "bcrypt";

export const adminregistration = async (req, res) => {


    const { fullname, email, phonenumber, password, role } = req.body;

    const validatedata = { fullname, email, phonenumber, password, role };
    const { error, value } = adminValidationSchema.validate(validatedata);

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ msg: "Validation Error !!", valerror: errors })
    }

    try {
        const preuser = await admins.findOne({ email: email });
        if (preuser) {
            return res.status(400).json({ msg: "Admin is Already present" });
        }
        else {

            const hashedpassword = await bcrypt.hash(password, 10);
            const addadmin = new admins({
                fullname, phonenumber, email, password: hashedpassword, role
            });

            addadmin.save();
            return res.status(200).json({ msg: "Admin Added Successfully" });

        }
    } catch (error) {

        console.log(error.message);
        return res.status(400).json({ msg: "Registration Failed" });

    }

}



export const adminSignin = async (req, res) => {
    const { email, password } = req.body;


    const user = await admins.findOne({ email: email });


    if (!user) {
        return res.status(400).json({ mag: "User Not Found" });
    }

    try {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return res.status(200).json({ data: { id: user._id, name: user.fullname, email: user.email, role: user.role } });
        } else {
            return res.status(400).json({ msg: "Password Did not Matched !!" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Signin Failed !!" });

    }


}


export const adminChecksession = async (req, res) => {
    if (req.session.islogin) {
        return res.status(200).json({ msg: "User Is Logged In" });
    }
    return res.status(400).json({ msg: "user Is Logged Out" });
}

export const adminLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ msg: "error in logout" });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ msg: 'Logout Successfull' });
    });
}

export const getLoggedInAdmin = async (req, res) => {
    const userid = req.query.id;
    try {
        const admin = await admins.findById(userid);
        return res.status(200).json(admin);
    } catch (error) {
        return res.status(400).json({ msg: "fetching failes", error: error.message });

    }

}


export const getAllAdmins = async (req, res) => {

    try {
        const adminsData = await admins.find();
        return res.status(200).json(adminsData);

    } catch (error) {
        return res.status(400).json({ msg: "fetching failes", error: error.message });

    }

}

export const updateAdmin = async (req, res) => {
    try {
        const userid = req.query.id;
        const updateData = req.query.updateData;

        const result = await admins.findByIdAndUpdate(userid, updateData, { new: true });
        if (!result) {
            return res.status(400).json({ msg: "User not Found" });
        }

        return res.status(200).json({ msg: 'Uspades', result: result });

    } catch (error) {
        return res.status(400).json({ msg: 'Uspades Falotro' });

    }


}

export const deleteAdmin = async (req, res) => {
    try {
        const user = await admins.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            return res.status(200).json({ msg: "User Deleted" });
        } else {
            return res.status(400).json({ msg: "User Not Found" });

        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Deletion Failed From The Server ", error: error.message });


    }

}