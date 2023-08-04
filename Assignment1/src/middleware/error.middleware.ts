import express from "express";
import HttpException from "../exceptions/http.exception";
import ValidationException from "../exceptions/validation.exception";

const errorMiddleware = (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        
    try{
        console.log(error.stack);
        if(error instanceof ValidationException){
            res.status(error.status).send({
                message: error.message,
                errors: error.errors,
            });
        }
        else if (error instanceof HttpException){
            res.status(error.status).send({error: error.message});
        } else{
            res.status(500).send(error.message);
        }
    } catch (err){
        next(err);
    }
};

export default errorMiddleware;