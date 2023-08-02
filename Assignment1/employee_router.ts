import express from "express";
import Employee from "./employee";
import dataSource from "./data-source";

const employeeRouter = express.Router();
let counter = 2;
const employees: Employee[] = [
    {
        id: 1, name: "Arya", email:"arya@gmail.com", createdAt : new Date(), updatedAt : new Date()
    },
    {
        id: 2, name: "Ann", email:"ann@gmail.com", createdAt : new Date(), updatedAt : new Date()
    }]



employeeRouter.get('/', async(req, res)=>{
    const empRepository = dataSource.getRepository(Employee);
    const employees = await empRepository.find();
    
    res.status(200).send(employees);
})

employeeRouter.get('/:id', async (req, res)=>{
    
    const result = dataSource.getRepository(Employee);

    const emp = await result.findOneBy({
        id: Number(req.params.id),
    })
    res.status(200).send(emp);
})

employeeRouter.post('/', async(req, res)=>{
    console.log(req.url);
    const newEmp = new Employee();
    newEmp.email = req.body.email;
    newEmp.name = req.body.name;
    
    const emp = dataSource.getRepository(Employee);
    const savedEmp = await emp.save(newEmp);

    res.status(201).send(savedEmp);
})

employeeRouter.put('/:id', async(req, res)=>{
    console.log(req.url);
    const emp = dataSource.getRepository(Employee);
    const getEmp = await emp.findOneBy({
        id: Number(req.params.id),
    });
    getEmp.email = req.body.email;
    getEmp.name = req.body.name;
    getEmp.updatedAt = new Date();
    await emp.save(getEmp);
    res.status(200).send(employees);
})

employeeRouter.delete('/:id', async(req, res)=>{
    console.log(req.url);
    const emp = dataSource.getRepository(Employee);
    const getEmp = await emp.findOneBy({
        id: Number(req.params.id),
    });
    await emp.remove(getEmp);
    res.status(204).send();
})

export {employeeRouter};