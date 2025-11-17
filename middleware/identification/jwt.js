import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   responses:
 *     UnauthorizedError:
 *       description: JWT is missing or invalid
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             example: Unauthorized access
 */

export const checkJWT = async (req, res, next) => {
    
        const authHeader = req.headers.authorization;
        
        if (authHeader?.includes("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
            id: decoded.id,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        };
        next();
        }catch(e){
            res.status(401).send(e.message); 
        }
    }else {
        res.status(401).send('No jwt'); 
    }
    
}; 