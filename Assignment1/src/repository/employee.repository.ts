import { DataSource, Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository{

    constructor(private employeeRepository: Repository<Employee>){}

    findAllEmployee(): Promise<Employee[]>{
        return this.employeeRepository.find();

    }

    async findEmployeeByID(id: number): Promise<Employee>{
        return this.employeeRepository.findOne({
            where:{id:id},
            relations : {
                address: true,
            }
        });
    }

    saveNewEmp(employee: Employee): Promise<Employee>{
        return this.employeeRepository.save(employee);
    }

    updateEmp(employee: Employee): Promise<Employee>{
        return this.employeeRepository.save(employee);
    }

    async deleteEmp(employee: Employee): Promise<Employee>{
        return this.employeeRepository.softRemove(employee);
    }
    

}

export default EmployeeRepository;