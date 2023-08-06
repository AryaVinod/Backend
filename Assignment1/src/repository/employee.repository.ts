import { DataSource, Repository, UpdateResult } from "typeorm";
import Employee from "../entity/employee.entity";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";

class EmployeeRepository{

    constructor(private employeeRepository: Repository<Employee>){}

    findAllEmployee(): Promise<Employee[]>{
        return this.employeeRepository.find({
            relations : {
                address: true,
            }
        });

    }

    async findEmployeeBy(filter: Partial<Employee> ): Promise<Employee>{
        return this.employeeRepository.findOne({
            where:filter,
            relations : {
                address: true,
            }
        });
    }


    saveNewEmp(employee: Employee): Promise<Employee>{
        return this.employeeRepository.save(employee);
    }

    updateEmp(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<UpdateResult>{
        return this.employeeRepository.update({id:id}, updateEmployeeDto);
    }

    async deleteEmp(employee: Employee): Promise<Employee>{
        return this.employeeRepository.softRemove(employee);
    }
    

}

export default EmployeeRepository;