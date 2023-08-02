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


import "reflect-metadata";
import express from "express";
import {employeeRouter} from "./employee_router";
import loggerMiddleware from "./loggerMiddleware";
import dataSource from "./data-source"

const server = express();
server.use(express.json());
server.use(loggerMiddleware);

server.use('/employees', employeeRouter);

server.get('/', (req, res)=>{
    console.log(req.url);
    res.status(200).send("hello world typescript");
});

(async () => {
    await dataSource.initialize();
    server.listen(3000, ()=>{
        console.log("Server is listening to 3000");
    });
})();

