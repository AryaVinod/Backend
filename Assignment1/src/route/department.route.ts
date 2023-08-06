import { DepartmentController } from "../controller/department.controller";
import dataSource from "../db/postgres.db";
import { Department } from "../entity/department.entity";
import { DepartmentRepository } from "../repository/department.repository";
import { DepartmentService } from "../service/department.service";

const deptRepository = new DepartmentRepository(dataSource.getRepository(Department));
  
const deptService = new DepartmentService(deptRepository);

const deptController = new DepartmentController(deptService);

const departmentRoute = deptController.router;
  
export default departmentRoute;