import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import HttpException from "../exceptions/http.exception";
import ValidationException from "../exceptions/validation.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware"
import Role from "../utils/role.enum";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import logger from "../logger/logger";

class EmployeeController{
    public router: express.Router;

    constructor(private employeeService: EmployeeService){
        this.router = express.Router();

        this.router.get("/", authenticate, this.getAllEmployees);
        this.router.get("/:id", authenticate, this.getEmployeeByID);
        this.router.post("/", authenticate, authorize([Role.ADMIN, Role.HR]), this.addEmployee);
        this.router.patch("/:id", authenticate, authorize([Role.ADMIN, Role.HR]), this.updateEmployeeByID);
        this.router.delete("/:id", authenticate, authorize([Role.ADMIN, Role.HR]), this.deleteEmployeeByID);
        this.router.post("/login", this.loginEmployee);
    }

    getAllEmployees = async(req: express.Request, res: express.Response)=>{
        const reqStart = Date.now()
        const employees = await this.employeeService.getAllEmployees();
        logger.info("Fetched All Employees Successfully")
        res.status(200).send({data: employees, errors: null, message: "ok", meta:{length: employees.length,took:Date.now()-reqStart,total:employees.length}});
    }

    getEmployeeByID = async(req: express.Request, res: express.Response, next:NextFunction)=>{
        try{
            const reqStart = Date.now()
            const employeeID = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeByID(employeeID);
            logger.info("Fetched Employee by ID Successfully")
            res.status(200).send({data: employee, errors: null, message: "ok", meta:{length: 1,took:Date.now()-reqStart,total:1}});
        } catch (error){
            next(error);
        }
    }

    addEmployee = async(req: express.Request, res: express.Response, next: NextFunction)=>{
        try{
            const reqStart = Date.now()
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);

            if(errors.length > 0){
                console.log(errors);
                throw new ValidationException(errors, "Validation Errors Occured");
            }
            const employee = await this.employeeService.addNewEmployee(createEmployeeDto);
            logger.info("Added Employee Successfully")
            res.status(200).send({data: employee, errors: null, message: "ok", meta:{length: 1,took:Date.now()-reqStart,total:1}});
        } catch(error) {
            next(error);
        }
    }
        

    updateEmployeeByID = async(req: express.Request, res: express.Response, next: NextFunction)=>{
        try{
            const reqStart = Date.now()
            const id = Number(req.params.id);
            await this.employeeService.getEmployeeByID(id);
            
            const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
            const errors = await validate(updateEmployeeDto);

            if(errors.length > 0){
                console.log(errors);
                throw new ValidationException(errors, "Validation Errors Occured");
            }

            const employee = await this.employeeService.updateEmployee(id, updateEmployeeDto);
            logger.info("Updated Employee Successfully")
            res.status(200).send({data: employee, errors: null, message: "ok", meta:{length: 1,took:Date.now()-reqStart,total:1}});

        } catch(error){
            next(error);
        }

    }

    deleteEmployeeByID = async(req: express.Request, res: express.Response)=>{
        const employeeID = Number(req.params.id);
        const employee = await this.employeeService.deleteEmployeeByID(employeeID);
        logger.info("Deleted Employee Successfully")
        res.status(200).send();
    }

    public loginEmployee = async(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const {username, password} = req.body;
        try{
            const reqStart = Date.now()
            const token = await this.employeeService.loginEmployee(username, password);
            logger.info("Logged In Successfully")
            res.status(200).send({data: token, errors: null, message: "ok", meta:{length: 1,took:Date.now()-reqStart,total:1}});
        } catch(error){
            next(error);
        }
    }
    
}

export default EmployeeController;