import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const data = jwt.verify(token, 'd8557f30-698d-4c0f-b8e4-bc77d82cf77e');
        const { id } =  data as TokenPayload;
        return next();
    }
    catch {
        return res.sendStatus(401);
    }
}