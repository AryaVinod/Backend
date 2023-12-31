import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import HttpException from "../exceptions/http.exception";
import { RequestWithUser } from "../utils/requestWithUser";
import { jwtPayload } from "../utils/jwtPayload.type";

const authenticate = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try{
        const token = getTokenFromRequestHeader(req);
        const payload: jwtPayload = jsonwebtoken.verify(token, "ABCDE") as jwtPayload;
        req.name = payload.name;
        req.username = payload.username;
        req.role = payload.role;
        next();

    } catch(error){
        next(new HttpException(401, error.message));
    }
}

const getTokenFromRequestHeader = (req: Request)=>{
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
    return token;
}

export default authenticate;