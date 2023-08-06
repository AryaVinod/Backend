// import {Calculator} from "./calculator";
// const initCalc = new Calculator();

// console.log(initCalc.add(10,3))
// console.log(initCalc.subtract(10,3))
// console.log(initCalc.divide(10,3))
// console.log(initCalc.multiply(10,3))
// console.log(initCalc.modulus(10,3))

// const http = require("http");

// const server = http.createServer((req, res)=>{
//     console.log(req.url);
//     res.writeHead(200);
//     res.end("Hello Wold")
// });

// server.listen(3000, ()=> {
//     console.log("Server is listening to 3000")
// })


import * as dotenv from "dotenv";
dotenv.config({path: __dirname+'/.env'});
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import employeeRoute from "./route/employee.route";
import departmentRoute from "./route/department.route";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db"
import errorMiddleware from "./middleware/error.middleware";
import Role from "./utils/role.enum";


const server = express();
server.use(express.json());
server.use(loggerMiddleware);

server.use('/employees', employeeRoute);
server.use('/departments', departmentRoute);

server.get('/', (req, res)=>{
    console.log(req.url);
    res.status(200).send("Employee Management");
});

server.get("/api/roles", (req,res)=>{
    res.status(200).send(Role)
  })

server.use(errorMiddleware);

(async () => {
    await dataSource.initialize();
    server.listen(3000, ()=>{
        console.log("Server is listening to 3000");
    });
})();

