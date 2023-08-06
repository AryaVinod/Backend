import { Department } from "../entity/department.entity";
import HttpException from "../exceptions/http.exception";
import { DepartmentRepository } from "../repository/department.repository";

export class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}
  
    createDepartment(name: string): Promise<Department> {
      const newDepartment = new Department();
      newDepartment.name = name;
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
  
    async updateDepartment(name: string, id: number): Promise<Department> {
      const departmenttoupdate = await this.departmentRepository.getDepartment(id);
      departmenttoupdate.name = name;
      return this.departmentRepository.updateDepartment(departmenttoupdate);
    }
  
    deleteDepartment(id: number): Promise<Department> {
      return this.departmentRepository.deleteDepartment(id);
    }
  }