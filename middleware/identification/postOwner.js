import { readPost } from "../../model/postDB.js";
import { getUserById } from "../../model/client.js";
import { pool } from "../../database/database.js";

export const postOwner = async (req, res, next) => {
    try {
        const postClientID = await readPost(pool, {id:(parseInt(req.params.id) || req.body.id)});
        const client = await getUserById(pool, req.user.id);
        const clientIsAdmin = client.is_admin; 
        if (postClientID && req.user.id === postClientID.client_id ){
            next();
        } else {
            if (clientIsAdmin){
                return next();
            }
            return res.status(403).send("Unauthorized");
        }
    } catch (err){
        res.status(500).send(err.message);
    }
}


