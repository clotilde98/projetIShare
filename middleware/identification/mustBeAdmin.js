/**
 * @swagger
 * components:
 *   responses:
 *     mustBeAdmin:
 *       description: User verification requires administrator privileges
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: Admin privileges required
 */

export const mustBeAdmin = (req, res, next) => {
    try {
        
        const isAdmin = req.user.is_admin; 
        if (isAdmin === true) {
            next();
        } else {
            return res.status(403).send("Forbidden: Administrator privileges required.");
        }

    } catch (err) {

        res.status(500).send("Internal Server Error.");
    }
};