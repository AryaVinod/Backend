import EmployeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";
import { test } from "node:test";
import HttpException from "../exceptions/http.exception";
import bcrypt from "bcrypt";
import CreateEmployeeDto from "../dto/create-employee.dto";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload.type";
import { Department } from "../entity/department.entity";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";


class EmployeeService{

    constructor(private employeeRepository: EmployeeRepository){}

    getAllEmployees(): Promise<Employee[]>{
        return this.employeeRepository.findAllEmployee();
    }

    async getEmployeeByID(id: number): Promise<Employee>{
        const emp = await this.employeeRepository.findEmployeeBy({id:id});
        if(!emp){
            throw new HttpException(404, `Employee not found with ID ${id}`);
        }
        return emp;

    }

    async addNewEmployee(employeeDto: CreateEmployeeDto): Promise<Employee>{
        const newEmp = new Employee();
        newEmp.username = employeeDto.username;
        newEmp.name = employeeDto.name;
        newEmp.password = await bcrypt.hash(employeeDto.password, 10);
        newEmp.role = employeeDto.role;
        newEmp.experience = employeeDto.experience;
        newEmp.joiningDate = employeeDto.joiningDate;

        const newDept = new Department();
        newDept.name = employeeDto.department;

        newEmp.department = newDept;

        const newAddress = new Address();
        newAddress.line1 = employeeDto.address.line1;
        newAddress.line2 = employeeDto.address.line2;
        newAddress.city = employeeDto.address.city;
        newAddress.state = employeeDto.address.state;
        newAddress.country = employeeDto.address.country;
        newAddress.pincode = employeeDto.address.pincode;
        newEmp.address = newAddress;

        return this.employeeRepository.saveNewEmp(newEmp);
    }

    async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>{
        const emp = this.getEmployeeByID(id);
        if(!emp){
            throw new HttpException(404, `Employee not found with ID ${id}`);
        }
        const updated = await this.employeeRepository.updateEmp(id, updateEmployeeDto);
        return await this.employeeRepository.findEmployeeBy({id:id});
    }

    async deleteEmployeeByID(id: number): Promise<Employee>{
        const emp = await this.getEmployeeByID(id = id);
        if(!emp){
            throw new HttpException(404, `Employee not found with ID ${id}`);
        }
        return this.employeeRepository.deleteEmp(emp);
    }


    loginEmployee = async (username: string, password: string) => {
        const employee = await this.employeeRepository.findEmployeeBy({username: username});
        if(!employee){
            throw new HttpException(401, "Employee not found");
        }

        const result = await bcrypt.compare(password, employee.password);
        if(!result){
            throw new HttpException(401, "Incorrect username or password");
        }

        const payload: jwtPayload = {
            name: employee.name,
            username: employee.username,
            role: employee.role
        }

        const token = jsonwebtoken.sign(payload, "ABCDE", {
            expiresIn: "1h"
        });

        return {token: token};
    }
}

export default EmployeeService;