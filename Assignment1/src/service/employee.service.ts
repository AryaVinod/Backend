import EmployeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";
import { test } from "node:test";
import HttpException from "../exceptions/http.exception";


class EmployeeService{

    constructor(private employeeRepository: EmployeeRepository){}

    getAllEmployees(): Promise<Employee[]>{
        return this.employeeRepository.findAllEmployee();
    }

    async getEmployeeByID(id: number): Promise<Employee>{
        const emp = await this.employeeRepository.findEmployeeByID(id);
        if(!emp){
            throw new HttpException(404, `Employee not found with ID ${id}`);
        }
        return emp;

    }

    addNewEmployee(name: string, email: string, address:any): Promise<Employee>{
        const newEmp = new Employee();
        newEmp.name = name;
        newEmp.email = email;

        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        newEmp.address = newAddress;

        return this.employeeRepository.saveNewEmp(newEmp);
    }

    async updateEmployee(id: number, name: string, email: string): Promise<Employee>{
        const emp = await this.getEmployeeByID(id);
        if(!emp){
            throw new HttpException(404, `Employee not found with ID ${id}`);
        }
        emp.name = name;
        emp.email = email;
        return this.employeeRepository.updateEmp(emp);
    }

    async deleteEmployeeByID(id: number): Promise<Employee>{
        const emp = await this.getEmployeeByID(id = id);
        if(!emp){
            throw new HttpException(404, `Employee not found with ID ${id}`);
        }
        return this.employeeRepository.deleteEmp(emp);
    }
}

export default EmployeeService;