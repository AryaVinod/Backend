import { CreateDepartmentDto } from "../dto/create-department.dto";
import { UpdateDepartmentDto } from "../dto/update-department.dto";
import { Department } from "../entity/department.entity";
import HttpException from "../exceptions/http.exception";
import { DepartmentRepository } from "../repository/department.repository";

export class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}
  
    createDepartment(createDeptDto: CreateDepartmentDto): Promise<Department> {
      const newDepartment = new Department();
      newDepartment.name = createDeptDto.name;
      return this.departmentRepository.createDepartment(newDepartment);
    }
  
    getAllDepartments(): Promise<Department[]> {
      return this.departmentRepository.getAllDepartments();
    }
  
    async getDepartmentByID(id: number): Promise<any> {
      const department = await this.departmentRepository.getDepartment(id);
      console.log(department);
      if (!department) {
        throw new HttpException(404, "Department not found");
      }
      return department;
    }
  
    async updateDepartment(id: number, updateDeptDto: UpdateDepartmentDto): Promise<Department> {
      const departmenttoupdate = await this.departmentRepository.getDepartment(id);
      departmenttoupdate.name = updateDeptDto.name;
      return this.departmentRepository.updateDepartment(departmenttoupdate);
    }
  
    deleteDepartment(id: number): Promise<Department> {
      return this.departmentRepository.deleteDepartment(id);
    }
  }