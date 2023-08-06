import express, { NextFunction, Request, Response, Router } from "express";
import { DepartmentService } from "../service/department.service";
import { plainToInstance } from "class-transformer";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import ValidationException from "../exceptions/validation.exception";
import { validate } from "class-validator";
import { UpdateDepartmentDto } from "../dto/update-department.dto";

export class DepartmentController {
    public router: Router;
  
    constructor(private departmentService: DepartmentService) {
        this.router = express.Router();
        this.router.post("/", this.createDepartment);
        this.router.put("/:id",this.updateDepartment);
        this.router.delete("/:id",this.deleteDepartment);
        this.router.get("/", this.getAllDepartments);
        this.router.get("/:id", this.getDepartmentByID);
    }
  
    createDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
    
            if (errors.length > 0) {
                throw new ValidationException(errors, "Validation Errors Occured");
            }
            const employee = await this.departmentService.createDepartment(createDepartmentDto.name);
            res.status(200).send(employee);
        } catch (err) {
            next(err);
        }
    };
  
    getAllDepartments = async (req: Request, res: Response) => {
        const employee = await this.departmentService.getAllDepartments();
        res.status(200).send(employee);
    };
  
    getDepartmentByID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employee = await this.departmentService.getDepartmentByID(Number(req.params.id));
            res.status(200).send(employee);
        } catch (error) {
            next(error);
        }
    };
  
    updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body;
            const id = Number(req.params.id);
    
            const updateDepartmentDto = plainToInstance( UpdateDepartmentDto, req.body);
            const errors = await validate(updateDepartmentDto);
    
            if (errors.length > 0) {
                throw new ValidationException(errors, "Validation Errors Occured");
            }
            const department = await this.departmentService.updateDepartment(name, id);
            res.status(201).send(department);
      } catch (err) {
        next(err);
      }
    };
  
    deleteDepartment = async (req: express.Request, res: express.Response) => {
      const id = Number(req.params.id);
      const employee = await this.departmentService.deleteDepartment(id);
      res.status(201).send(employee);
    };
  }