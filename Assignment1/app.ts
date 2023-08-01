import {Calculator} from "./calculator";
const initCalc = new Calculator();

console.log(initCalc.add(10,3))
console.log(initCalc.subtract(10,3))
console.log(initCalc.divide(10,3))
console.log(initCalc.multiply(10,3))
console.log(initCalc.modulus(10,3))

// const http = require("http");

// const server = http.createServer((req, res)=>{
//     console.log(req.url);
//     res.writeHead(200);
//     res.end("Hello Wold")
// });

// server.listen(3000, ()=> {
//     console.log("Server is listening to 3000")
// })


// import express from "express";

// const server = express();

// server.get('/', (req, res)=>{
//     console.log(req.url);
//     res.status(200).send("hello world typescript");
// })

// server.listen(3000, ()=>{
//     console.log("Server is listening to 3000")
// })