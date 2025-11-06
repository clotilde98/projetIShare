import { addClientValidator, loginValidator, updateClientValidator } from "./validator/client.js"; 


export const clientValidatorMiddleware = {
    addClientValidator: async (req, res, next) => {
        try {
            req.val = await addClientValidator.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.message);
        }
    },
    loginValidator : async (req, res, next) => {
        try {
            req.val = await loginValidator.validate(req.body);
            next();
        } catch (e){
            res.status(400).send(e.message);
        }
    },
    updateClientValidator: async (req, res, next) => {
        try {
            req.val = await updateClientValidator.validate(req.body);
            next();
        } catch (e){
            res.status(400).send(e.message);
        }
    }
};