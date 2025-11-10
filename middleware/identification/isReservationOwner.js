import { readReservation } from "../../model/reservationDB.js"; 
import { getUserById } from "../../model/client.js";
import { pool } from "../../database/database.js";

export const isReservationOwner = async (req, res, next) => {
    try {
        const reservationClientID = await readReservation(pool, {id:(parseInt(req.params.id) || req.body.id)});
        const client = await getUserById(pool, req.user.id);
        const clientIsAdmin = client.is_admin; 
        
        if (!reservation) {
            return res.status(404).send("Reservation not found");
        }

        if (reservationClientID && req.user.id === reservationClientID.client_id ){
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