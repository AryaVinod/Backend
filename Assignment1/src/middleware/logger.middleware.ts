import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setHeader('Access-Control-Allow-Methods', '*')
    // res.setHeader('Access-Control-Allow-Credentials', 'true')
    // res.setHeader('Access-Control-Allow-Headers', '*')
    console.log(`${new Date()}: ${req.url} : ${req.method}`);
    next();
}

export default loggerMiddleware;