import { pool } from "../../database/database.js";
import { readReservation } from "../../model/reservationDB.js"; 
import { readPost } from '../../model/postDB.js'; 


export const checkReservationAccess = (requiresPostOwner = false) => async (req, res, next) => {
    try {
        const userId = req.user.id;
        const isAdmin = req.user.is_admin;
        const reservationId = parseInt(req.params.id);
        
        if (isNaN(reservationId)) {
            return res.status(400).send("ID de réservation invalide.");
        }

        const reservation = await readReservation(pool, { id: reservationId });
        if (!reservation) {
            return res.status(404).send("Réservation non trouvée.");
        }

        const isBeneficiary = reservation.client_id === userId;

        if (isAdmin || isBeneficiary) {
            return next();
        }

        
        if (requiresPostOwner) {
            const postId = reservation.post_id;
            const post = await readPost(pool, { id: postId });
            if (post && post.client_id === userId) {
                return next();
            }
        }
        
        return res.status(403).send("Forbidden: Accès non autorisé à cette ressource.");

    } catch (err) {
        console.error("Erreur dans le middleware checkReservationAccess:", err.message);
        res.status(500).send("Erreur interne du serveur.");
    }
};