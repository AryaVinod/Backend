import express from "express";
import EmployeeService from "../service/employee.service";

class EmployeeController{
    public router: express.Router;

    constructor(private employeeService: EmployeeService){
        this.router = express.Router();

        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeByID);
        this.router.post("/", this.addEmployee);
        this.router.put("/:id", this.updateEmployeeByID);
        this.router.delete("/:id", this.deleteEmployeeByID);
    }

    getAllEmployees = async(req: express.Request, res: express.Response)=>{
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    getEmployeeByID = async(req: express.Request, res: express.Response)=>{
        const employeeID = Number(req.params.id);
        const employee = await this.employeeService.getEmployeeByID(employeeID);
        res.status(200).send(employee);
    }

    addEmployee = async(req: express.Request, res: express.Response)=>{
        const employeeName = req.body.name;
        const employeeEmail = req.body.email;
        const employee = await this.employeeService.addNewEmployee(employeeName, employeeEmail);
        res.status(200).send(employee);
    }

    updateEmployeeByID = async(req: express.Request, res: express.Response)=>{
        const employeeName = req.body.name;
        const employeeEmail = req.body.email;
        const employeeID = Number(req.params.id);
        const employee = await this.employeeService.updateEmployee(employeeID, employeeName, employeeEmail);
        res.status(200).send(employee);
    }

    deleteEmployeeByID = async(req: express.Request, res: express.Response)=>{
        const employeeID = Number(req.params.id);
        const employee = await this.employeeService.deleteEmployeeByID(employeeID);
        res.status(200).send();
    }
    
}

export default EmployeeController;