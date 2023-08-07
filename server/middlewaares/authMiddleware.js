import Jwt from "jsonwebtoken";

// Protected routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = Jwt.verify(
            req.headers.authorization,
            "thisisusw04jsonwebtoken"
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
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
                "thisisusw04jsonwebtoken"
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
                "thisisusw04jsonwebtoken"
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
                "thisisusw04jsonwebtoken"
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