import Jwt from "jsonwebtoken";

// Protected routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        // const decode = Jwt.verify(
        //     req.headers.authorization,
        //     "thisisusw04jsonwebtoken"
        // );

        const token = req.body.token;
        Jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (!err) {
                // console.log("decd " + JSON.stringify(decoded));
                req.user = decoded;
                next();

            }
            else {
                console.log("er " + JSON.stringify(err));
                res.status(200).send({ ok: false, decoded: "decoded" });
                //     /*
                //     err = {
                //         name: 'TokenExpiredError',
                //         message: 'jwt expired',
                //         expiredAt: 1408621000
                //     }
                //     */
            }
        });


    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: "Error in requiresignin middleware",
            error,
        })
    }
}

// is merchant 
export const isMerchant = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        let decode;

        if (token) {
            decode = Jwt.verify(
                token,
                process.env.JWT_SECRET
            );
        }
        else {
            return res.status(200).send();
        }
        // req.user = decode;

        const role = decode.role;
        if (role !== "Merchant") {
            return res.status(200).send({
                success: false,
                message: "UnAuthorized Access"
            });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            error,
            message: "Token invalid"
        })
    }
}

// check is customer
export const isCustomer = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
        let decode;

        if (token) {
            decode = Jwt.verify(
                token,
                process.env.JWT_SECRET
            );
        }
        else {
            return res.status(200).send();
        }
        // req.user = decode;

        const role = decode.role;

        if (role !== "Customer") {
            return res.status(200).send({
                success: false,
                message: "UnAuthorized Access"
            });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            error,
            message: "Token invalid"
        })
    }
}

// check is delivery person
export const isDPerson = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        let decode;

        if (token) {
            decode = Jwt.verify(
                token,
                process.env.JWT_SECRET
            );
        }
        else {
            return res.status(200).send();
        }
        // req.user = decode;

        const role = decode.role;

        if (role !== "DeliveryPerson") {
            console.log("if del" + role + "f");
            return res.status(200).send({
                success: false,
                message: "UnAuthorized Access"
            });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error,
            success: false,
            message: "Error in authMiddleware isDPerson"
        })
    }
}