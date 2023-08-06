import { Repository } from "typeorm";
import { Department } from "../entity/department.entity";

export class DepartmentRepository {
    constructor(private depRepository: Repository<Department>) {}
  
    createDepartment(newDepartment: Department): Promise<Department> {
      return this.depRepository.save(newDepartment);
    }
  
    getAllDepartments(): Promise<Department[]> {
      return this.depRepository.find();
    }
  
    async getDepartment(id: number): Promise<Department> {
      return await this.depRepository.findOneBy({id: id})
    }
  
    updateDepartment(updateEmployee: Department): Promise<Department> {
      return this.depRepository.save(updateEmployee);
    }
  
    async deleteDepartment(id: number): Promise<Department> {
      const deptodelete = await this.getDepartment(id);
      return this.depRepository.softRemove(deptodelete);
    }
  
  }