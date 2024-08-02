import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
import { NextFunction, Response, Request } from "express";

export function authMiddleware(next: NextFunction, req: Request, res: Response) {
    const token = req.headers.authorization as unknown as string;
    try {

        const payload = jwt.verify(token, JWT_PASSWORD);
        //@ts-ignore
        req.id = payload.id;
        next();

    } catch (error) {


        return res.status(403).json({
            "error": "you are not auntheicated user"
        })
    }
}
