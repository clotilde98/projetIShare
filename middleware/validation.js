import { addClientValidator, loginValidator, updateClientValidator } from "./validator/client.js"; 


export const clientValidatorMiddleware = {
    addClientValidator: async (req, res, next) => {
        try {
            req.val = await addClientValidator.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    loginValidator : async (req, res, next) => {
        try {
            req.val = await loginValidator.validate(req.body);
            next();
        } catch (e){
            res.status(400).send(e.messages);
        }
    },
    updateClientValidator: async (req, res, next) => {
        try {
            req.val = await updateClientValidator.update.validate(req.body);
            next();
        } catch (e){
            res.status(400).send(e.messages);
        }
    }
};