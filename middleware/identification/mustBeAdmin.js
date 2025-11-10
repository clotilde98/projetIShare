
export const mustBeAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send("Authentication required.");
        }

        const isAdmin = req.user.is_admin; 
        if (isAdmin === true) {
            next();
        } else {
            return res.status(403).send("Forbidden: Administrator privileges required.");
        }

    } catch (err) {
        console.error("Error in mustBeAdmin middleware:", err);
        res.status(500).send("Internal Server Error.");
    }
};