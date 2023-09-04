import qbDB from "../config/db.js";

export const getProfileController = async (req, res) => {
    try {
        const { uname } = req.params;
        const user = await qbDB.collection("customer").findOne({ uname });
        console.log("un " + uname);
        delete user._id;
        delete user.password;

        res.status(200).send({
            user,
            success: true,
            message: "User fetched success"
        })
    }
    catch (err) {
        res.status(400).send({
            err,
            success: false,
            message: "error in fetch User"
        })
    }
}

export const UpdateUserController = async (req, res) => {
    try {
        const { uname } = req.params;
        const updUser = req.body;
        await qbDB.collection('customer').updateOne({ uname }, { $set: updUser })
        res.status(200).send({
            success: true,
            message: "user updated"
        })
    }
    catch (err) {
        res.status(200).send({
            err,
            success: false,
            message: "err in user updating"
        })
    }
}

export const getNameController = async (req, res) => {
    try {
        const { uname } = req.params;
        const { name } = await qbDB.collection("customer").findOne({ uname });

        res.status(200).send({
            name,
            success: true,
            message: "Name found"
        });
    }
    catch (err) {
        res.status(200).send({
            err,
            success: false,
            message: "err getting name"
        })
    }
}