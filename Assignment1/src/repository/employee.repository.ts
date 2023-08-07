import { DataSource, Repository, UpdateResult } from "typeorm";
import Employee from "../entity/employee.entity";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import Address from "../entity/address.entity";

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

    async updateEmp(id: number, updateEmployeeDto: any): Promise<Employee> {
        const partialEmployeeEntity = {
          id: id,
          ...updateEmployeeDto,
          address: updateEmployeeDto.address
            ? {
                id: (await this.generateIDForAddress(id)).id,
                ...updateEmployeeDto.address,
              }
            : undefined,
        };
    
        const employee = await this.employeeRepository.preload(partialEmployeeEntity);
    
        return this.employeeRepository.save(employee);
    
        // const user = this.empRepository.update(id,{...updateEmployeeDto});
        // return this.findOneBy({id:id})
      }


    saveNewEmp(employee: Employee): Promise<Employee>{
        return this.employeeRepository.save(employee);
    }

    // updateEmp(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<UpdateResult>{
    //     return this.employeeRepository.update({id:id}, updateEmployeeDto);
    // }

    async deleteEmp(employee: Employee): Promise<Employee>{
        return this.employeeRepository.softRemove(employee);
    }

    async generateIDForAddress(id): Promise<Address> {
        const employee = await this.findEmployeeBy({ id: id });
        return employee.address;
      }
    

}

export default EmployeeRepository;