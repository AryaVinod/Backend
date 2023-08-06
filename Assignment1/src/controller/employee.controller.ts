import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import HttpException from "../exceptions/http.exception";
import ValidationException from "../exceptions/validation.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware"

class EmployeeController{
    public router: express.Router;

    constructor(private employeeService: EmployeeService){
        this.router = express.Router();

        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeByID);
        this.router.post("/", this.addEmployee);
        this.router.put("/:id", this.updateEmployeeByID);
        this.router.delete("/:id", this.deleteEmployeeByID);
        this.router.post("/login", this.loginEmployee);
    }

    getAllEmployees = async(req: express.Request, res: express.Response)=>{
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    getEmployeeByID = async(req: express.Request, res: express.Response, next:NextFunction)=>{
        try{
            const employeeID = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeByID(employeeID);
            res.status(200).send(employee);
        } catch (error){
            next(error);
        }
    }

    addEmployee = async(req: express.Request, res: express.Response, next: NextFunction)=>{
        try{
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);

            if(errors.length > 0){
                console.log(errors);
                throw new ValidationException(errors, "Validation Errors Occured");
            }
            const employee = await this.employeeService.addNewEmployee(createEmployeeDto);
            res.status(200).send(employee);
        } catch(error) {
            next(error);
        }
    }
        

    updateEmployeeByID = async(req: express.Request, res: express.Response)=>{
        const employeeName = req.body.name;
        const employeeEmail = req.body.email;
        const employeeID = Number(req.params.id);
        const employee = await this.employeeService.updateEmployee(employeeID, employeeName);
        res.status(200).send(employee);
    }

    deleteEmployeeByID = async(req: express.Request, res: express.Response)=>{
        const employeeID = Number(req.params.id);
        const employee = await this.employeeService.deleteEmployeeByID(employeeID);
        res.status(200).send();
    }

    public loginEmployee = async(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const {email, password} = req.body;
        try{
            const token = await this.employeeService.loginEmployee(email, password);
            res.status(200).send({data: token});
        } catch(error){
            next(error);
        }
    }
    
}

export default EmployeeController;