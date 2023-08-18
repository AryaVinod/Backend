import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import Role from "../utils/role.enum";
import HttpException from "../exceptions/http.exception";

const authorize = function(roles: Role[]){

    return async(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try{
            const role = req.role;
            if(roles.indexOf(role)==-1){
                throw new HttpException(403, "You are not authorized to perform this action");
            }
            next();
        } catch(error){
            next(error);
        }
    }
}

export default authorize;