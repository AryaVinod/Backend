import express, { NextFunction, Request, Response, Router } from "express";
import { DepartmentService } from "../service/department.service";
import { plainToInstance } from "class-transformer";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import ValidationException from "../exceptions/validation.exception";
import { validate } from "class-validator";
import { UpdateDepartmentDto } from "../dto/update-department.dto";
import authorize from "../middleware/authorize.middleware";
import Role from "../utils/role.enum";
import logger from "../logger/logger";
import authenticate from "../middleware/authenticate.middleware";

export class DepartmentController {
    public router: Router;
  
    constructor(private departmentService: DepartmentService) {
        this.router = express.Router();
        this.router.post("/", authenticate, authorize([Role.ADMIN, Role.HR]), this.createDepartment);
        this.router.put("/:id", authenticate, authorize([Role.ADMIN, Role.HR]),this.updateDepartment);
        this.router.delete("/:id", authenticate, authorize([Role.ADMIN, Role.HR]), this.deleteDepartment);
        this.router.get("/", authenticate, this.getAllDepartments);
        this.router.get("/:id", authenticate, this.getDepartmentByID);
    }
  
    createDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reqStart = Date.now()
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
    
            if (errors.length > 0) {
                throw new ValidationException(errors, "Validation Errors Occured");
            }
            const dept = await this.departmentService.createDepartment(createDepartmentDto);
            console.log("Department Created Successully");
            res.status(200).send({data: dept, errors: null, message: "ok", meta:{length: 1,took:Date.now()-reqStart,total:1}});
        } catch (err) {
            next(err);
        }
    };
  
    getAllDepartments = async (req: Request, res: Response) => {
        const reqStart = Date.now()
        const dept = await this.departmentService.getAllDepartments();
        console.log("Departments Fetched Successfully");
        res.status(200).send({data: dept, errors: null, message: "ok", meta:{length: dept.length,took:Date.now()-reqStart,total:dept.length}});
    };
  
    getDepartmentByID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reqStart = Date.now()
            const dept = await this.departmentService.getDepartmentByID(Number(req.params.id));
            console.log("Department Fetched by ID Successfully");
            res.status(200).send({data: dept, errors: null, message: "ok", meta:{length: 1,took:Date.now()-reqStart,total:1}});
        } catch (error) {
            next(error);
        }
    };
  
    updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reqStart = Date.now()
            const { name } = req.body;
            const id = Number(req.params.id);
    
            const updateDepartmentDto = plainToInstance( UpdateDepartmentDto, req.body);
            const errors = await validate(updateDepartmentDto);
    
            if (errors.length > 0) {
                throw new ValidationException(errors, "Validation Errors Occured");
            }
            const dept = await this.departmentService.updateDepartment(id, updateDepartmentDto);
            console.log("Updated Department Successfully");
            res.status(201).send({data: dept, errors: null, message: "ok", meta:{length: 1,took:Date.now()-reqStart,total:1}});
      } catch (err) {
        next(err);
      }
    };
  
    deleteDepartment = async (req: express.Request, res: express.Response) => {
        const reqStart = Date.now()
        const id = Number(req.params.id);
        const dept = await this.departmentService.deleteDepartment(id);
        console.log("Department Deleted Successfully");
        res.status(201).send({data: dept, errors: null, message: "ok", meta:{length: 1,took:Date.now()-reqStart,total:1}});
    };
}