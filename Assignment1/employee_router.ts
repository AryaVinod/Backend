import express from "express";
import Employee from "./employee";

const employeeRouter = express.Router();
let counter = 2;
const employees: Employee[] = [
    {
        id: 1, name: "Arya", email:"arya@gmail.com", createdAt : new Date(), updatedAt : new Date()
    },
    {
        id: 2, name: "Ann", email:"ann@gmail.com", createdAt : new Date(), updatedAt : new Date()
    }]



employeeRouter.get('/', (req, res)=>{
    console.log(req.url);
    res.status(200).send(employees);
})

employeeRouter.get('/:id', (req, res)=>{
    const empid = Number(req.params.id);
    console.log(req.url);
    const emp = employees.find((emp)=> {return empid == emp.id});
    res.status(200).send(emp);
})

employeeRouter.post('/', (req, res)=>{
    console.log(req.url);
    const newEmp = new Employee();
    newEmp.email = req.body.email;
    newEmp.name = req.body.name;
    newEmp.id = ++counter;
    newEmp.createdAt = new Date();
    newEmp.updatedAt = new Date();
    employees.push(newEmp);
    res.status(200).send(employees);
})

employeeRouter.put('/:id', (req, res)=>{
    console.log(req.url);
    const empid = Number(req.params.id);
    const emp = employees.find((emp)=> {return empid == emp.id})
    emp.email = req.body.email;
    emp.name = req.body.name;
    emp.updatedAt = new Date();
    res.status(200).send(employees);
})

employeeRouter.delete('/:id', (req, res)=>{
    console.log(req.url);
    const empid = Number(req.params.id);
    // const emp = employees.find((emp)=> {return empid == emp.id});
    const idx = employees.findIndex((emp)=> {return empid == emp.id})
    employees.splice(idx, 1);
    res.status(204).end();
})

export {employeeRouter};