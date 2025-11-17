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
<<<<<<< HEAD
        
        const isAdmin = req.user.is_admin; 
=======
        if (!req.user) {
            return res.status(401).send("Authentication required.");
        }

        const isAdmin = req.user.isAdmin; 
>>>>>>> 326b842274a3f2c8f7cdbfdec6f39b825b064bfe
        if (isAdmin === true) {
            return next();
        } else {
            next(new Error("Must be admin"));
        }

    } catch (err) {
<<<<<<< HEAD

        res.status(500).send("Internal Server Error.");
=======
        next("error");
>>>>>>> 326b842274a3f2c8f7cdbfdec6f39b825b064bfe
    }
};