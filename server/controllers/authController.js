import bcrypt from 'bcrypt'
import qbDB from "../config/db.js"
import JWT from 'jsonwebtoken';

// const hashPassword = async (password) => {
//     try {
//         const saltRounds = 10;
//         await bcrypt.hash(password, saltRounds).then(function (hash) {
//             return hash
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

// const comparePassword = async (password, hashedPassword) => {
//     bcrypt.compare(password, hashedPassword).then(function (result) {
//         return result
//     });
// }


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

        res.status(200).send({
            success: true,
            message: "Customer Registered Successfully",
        })

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
        const { shopName, shopImg, area, pincode, ownerName, email, uname, password } = req.body;

        if (!shopName) {
            return res.send({ error: "Shop Name is Required" });
        }
        if (!shopImg) {
            return res.send({ error: "Shop Image is Required" });
        }
        if (!area) {
            return res.send({ error: "Shop area is Required" });
        }
        if (!pincode) {
            return res.send({ error: "Pincode is Required" });
        }
        if (!ownerName) {
            return res.send({ error: "Owner Name is Required" });
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

        await qbDB.collection("shops").insertOne({ shopName, shopImg, area, pincode, ownerName, email, uname, password: hashedPassword, categories: [], prods: [] });

        res.status(200).send({
            success: true,
            message: "Shop Registered Successfully",
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

        res.status(200).send({
            success: true,
            message: "User Registered Successfully",
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
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        if (req.params.user === "c") {

            const customer = await qbDB.collection("customer").findOne({ uname });
            if (!customer) {
                return res.status(404).send({
                    success: false,
                    message: "Customer is not Registered Please Register"
                })
            }
            // console.log("customer.password " + JSON.stringify(customer.password));
            let match;
            await bcrypt.compare(password, customer.password).then(function (result) {
                match = result;
            });
            if (!match) {
                res.status(200).send({
                    success: false,
                    message: "Invalid Password",
                })
            }

            //token
            const token = JWT.sign({
                exp: 60,
                data: customer._id
            }, 'thisisusw04jsonwebtoken');

            res.status(200).send({
                success: true,
                message: "Login Successfull",
                user: {
                    user: "Customer",
                    name: customer.name
                }
            })

        } else if (req.params.user === "s") {

            const shopKeeper = await qbDB.collection("shop").findOne({ uname });
            if (!shopKeeper) {
                return res.status(404).send({
                    success: false,
                    message: "Shop-Keeper is not Registered Please Register"
                })
            }
            let match;
            await bcrypt.compare(password, shopKeeper.password).then(function (result) {
                match = result;
            });
            if (match) {
                res.status(200).send({
                    success: false,
                    message: "Invalid Password",
                })
            }

            //token
            const token = JWT.sign({
                exp: 60,
                data: customer._id
            }, 'thisisusw04jsonwebtoken');

            res.status(200).send({
                success: true,
                message: "Login Successfull",
                user: {
                    user: "ShopKeeper",
                    name: shopKeeper.ownerName
                }
            })

        } else if (req.params.user === "d") {

            const dperson = await qbDB.collection("deliveryperson").findOne({ uname });
            if (!dperson) {
                return res.status(404).send({
                    success: false,
                    message: "Delivery person is not Registered Please Register"
                })
            }
            let match;
            await bcrypt.compare(password, dperson.password).then(function (result) {
                match = result;
            });
            if (match) {
                res.status(200).send({
                    success: false,
                    message: "Invalid Password",
                })
            }

            //token
            const token = JWT.sign({
                exp: 60,
                data: customer._id
            }, 'thisisusw04jsonwebtoken');

            res.status(200).send({
                success: true,
                message: "Login Successfull",
                user: {
                    user: "Delivery person",
                    name: dperson.ownerName
                }
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