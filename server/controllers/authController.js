import bcrypt from 'bcrypt'
import qbDB from "../config/db.js"
import JWT from 'jsonwebtoken';
import nodeMailer from 'nodemailer'


// send Email for reset password

const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SEVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: "<b>hello</b>"
    }

    await transporter.sendMail(mailOptions);

}


// customer controller

export const cregisterController = async (req, res) => {
    try {
        const { name, email, uname, password, address, pincode } = req.body;

        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ error: "Email is Required" });
        }
        if (!uname) {
            return res.send({ error: "Username is Required" });
        }
        if (!password) {
            return res.send({ error: "Password is Required" });
        }
        if (!address) {
            return res.send({ error: "Address is Required" });
        }
        if (!pincode) {
            return res.send({ error: "Pincode is Required" });
        }

        const existingUser = await qbDB.collection("customer").findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "User already exist"
            });
        }

        let hashedPassword;
        await bcrypt.hash(password, 10).then(function (hash) {
            hashedPassword = hash;
        });

        await qbDB.collection("customer").insertOne({ name, email, uname, password: hashedPassword, address, pincode });

        //token

        const token = JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            role: "Customer"
        }, process.env.JWT_SECRET);

        // const token = JWT.sign({
        //     role: 'Customer'
        // }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });

        res.status(200).send({
            success: true,
            message: "Customer Registered Successfully",
            user: {
                role: "Customer",
                uname: uname
            },
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "err in auth Route",
            error
        })
    }
}


//shop register controller
export const sregisterController = async (req, res) => {
    try {
        const { shopName, shopDesc, imageUrl, area, pincode, ownerName, email, uname, password } = req.body;
        const Npincode = parseInt(pincode);

        const existingShop = await qbDB.collection("shops").findOne({ shopName: shopName });

        if (existingShop) {
            return res.status(200).send({
                success: true,
                message: "Shop Already Exist"
            })
        }

        let hashedPassword;
        await bcrypt.hash(password, 10).then(function (hash) {
            hashedPassword = hash;
        });

        await qbDB.collection("shops").updateOne({ name: "shopId" }, { $inc: { currId: 1 } })
        const shopId = await qbDB.collection("shops").findOne({ name: "shopId" });
        const currId = shopId.currId;
        await qbDB.collection("shops").insertOne({ id: currId, shopName, desc: shopDesc, shopImg: imageUrl, area, pincode: Npincode, ownerName, email, uname, password: hashedPassword, categories: [], prods: [] });

        //token

        const token = JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            role: "Merchant"
        }, process.env.JWT_SECRET);

        // const token = JWT.sign({
        //     role: 'Merchant'
        // }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });

        res.status(200).send({
            success: true,
            message: "Shop Registered Successfully",
            user: {
                role: "Merchant",
                uname: uname
            },
            token: token
        })

    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in auth route",
            error
        })
    }
}


//delivery person register controller
export const dregisterController = async (req, res) => {
    try {
        const { name, shopName, email, uname, password } = req.body;

        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!shopName) {
            return res.send({ error: "Shop Name is Required" });
        }
        if (!email) {
            return res.send({ error: "Email is Required" });
        }
        if (!uname) {
            return res.send({ error: "Username is Required" });
        }
        if (!password) {
            return res.send({ error: "Password is Required" });
        }

        const existingUser = await qbDB.collection("deliveryperson").findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "User already exist"
            });
        }

        let hashedPassword;
        await bcrypt.hash(password, 10).then(function (hash) {
            hashedPassword = hash;
        });

        await qbDB.collection("deliveryperson").insertOne({ name, shopName, email, uname, password: hashedPassword });

        //token

        const token = JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            role: "DeliveryPerson"
        }, process.env.JWT_SECRET);

        // const token = JWT.sign({
        //     role: 'DeliveryPerson'
        // }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });

        res.status(200).send({
            success: true,
            message: "User Registered Successfully",
            user: {
                role: "dperson",
                uname: uname
            },
            token: token
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in auth route",
            error
        })
    }
}



// Login Controller

export const loginController = async (req, res) => {
    try {
        const { uname, password } = req.body;

        if (!uname || !password) {
            return res.status(200).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        if (req.params.user === "c") {

            const customer = await qbDB.collection("customer").findOne({ uname });
            if (!customer) {
                return res.status(200).send({
                    success: false,
                    message: "Customer does not Exist Please Register"
                })
            }
            // console.log("customer.password " + JSON.stringify(customer.password));
            let match;
            await bcrypt.compare(password, customer.password).then(function (result) {
                match = result;
            });
            if (!match) {
                return res.status(200).send({
                    success: false,
                    message: "Invalid Password",
                })
            }

            //token

            const token = JWT.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                role: "Customer"
            }, process.env.JWT_SECRET);

            // const token = JWT.sign({
            //     role: 'Customer'
            // }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });

            res.status(200).send({
                success: true,
                message: "Login Successfull",
                user: {
                    role: "Customer",
                    uname: customer.uname
                },
                token: token
            });

        } else if (req.params.user === "s") {

            const shopKeeper = await qbDB.collection("shops").findOne({ uname });
            if (!shopKeeper) {
                return res.status(200).send({
                    success: false,
                    message: "Shop-Keeper is not Registered Please Register"
                })
            }
            let match;
            await bcrypt.compare(password, shopKeeper.password).then(function (result) {
                match = result;
            });
            if (!match) {
                return res.status(200).send({
                    success: false,
                    message: "Invalid Password",
                })
            }

            //token

            const token = JWT.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                role: "Merchant"
            }, process.env.JWT_SECRET);

            // const token = JWT.sign({
            //     role: 'Merchant'
            // }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });

            res.status(200).send({
                success: true,
                message: "Login Successfull",
                user: {
                    role: "Merchant",
                    uname: shopKeeper.uname
                },
                token: token
            })


        } else if (req.params.user === "d") {

            const dperson = await qbDB.collection("deliveryperson").findOne({ uname });
            console.log("dp " + JSON.stringify(dperson));
            if (!dperson) {
                return res.status(200).send({
                    success: false,
                    message: "Delivery person is not Registered Please Register"
                })
            }
            let match;
            await bcrypt.compare(password, dperson.password).then(function (result) {
                match = result;
            });
            if (!match) {
                return res.status(200).send({
                    success: false,
                    message: "Invalid Password",
                })
            }

            //token

            const token = JWT.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                role: "DeliveryPerson"
            }, process.env.JWT_SECRET);

            // const token = JWT.sign({
            //     role: 'DeliveryPerson'
            // }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });

            res.status(200).send({
                success: true,
                message: "Login Successfull",
                user: {
                    role: "DeliveryPerson",
                    uname: dperson.uname
                },
                token: token
            })

        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "",
            error
        })
    }
}


// Forgot Password controller 

export const forgotPasswordController = async (req, res) => {

    const { email } = req.body;

    const user = qbDB.collection("customer").findOne({ email });

    if (!user) {
        req.status(404).send({
            success: false,
            message: "User Not Found"
        });
    }

    //token

    const token = JWT.sign({
        exp: Math.floor(Date.now() / 1000) + (30 * 30),
        uname: user.uname
    }, process.env.JWT_SECRET);

    // const token = JWT.sign({
    //     uname: user.uname
    // }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });

    const resetPasswordUrl = `http://localhost:5050/auth/resetpassword/${token}`;

    const message = `Click the below link to Reset Your Password :- \n\n ${resetPasswordUrl} \n\n If not Requested by you then, Please ignore it.`;

    try {
        console.log("fg");
        await sendEmail({
            email,
            subject: "Quik Buy Password Recovery",
            message
        });

        res.status(200).send({
            success: true,
            message: `Email Sent to ${email} Successfully`
        })

    } catch (error) {

        res.status(404).send({
            message: error.message,
            error
        })
    }

}


export const getHashPasswordController = async (req, res) => {

    const password = req.params.password;

    let hashedPassword;
    await bcrypt.hash(password, 10).then(function (hash) {
        hashedPassword = hash;
    });

    res.status(200).send({
        hashedPassword
    });
}