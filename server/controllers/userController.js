import qbDB from "../config/db.js";

export const getProfileController = async (req, res) => {
    try {
        const { uname, role } = req.params;
        let coll = "";
        switch (role) {
            case "Customer":
                coll = "customer";
                break;
            case "Merchant":
                coll = "shops";
                break;
            case "DeliveryPerson":
                coll = "deliveryperson";
                break;
            default:
                break;
        }
        const user = await qbDB.collection(coll).findOne({ uname });
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
        const { updUser } = req.body;
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
        const customer = await qbDB.collection("customer").findOne({ uname });
        res.status(200).send({
            name: customer.name,
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