import EmployeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";


class EmployeeService{

    constructor(private employeeRepository: EmployeeRepository){}

    getAllEmployees(): Promise<Employee[]>{
        return this.employeeRepository.findAllEmployee();
    }

    getEmployeeByID(id: number): Promise<Employee>{
        return this.employeeRepository.findEmployeeByID(id);
    }

    addNewEmployee(name: string, email: string): Promise<Employee>{
        const newEmp = new Employee();
        newEmp.name = name;
        newEmp.email = email;
        return this.employeeRepository.saveNewEmp(newEmp);
    }

    async updateEmployee(id: number, name: string, email: string): Promise<Employee>{
        const emp = await this.getEmployeeByID(id);
        emp.name = name;
        emp.email = email;
        return this.employeeRepository.updateEmp(emp);
    }

    async deleteEmployeeByID(id: number): Promise<Employee>{
        const emp = await this.getEmployeeByID(id = id);
        return this.employeeRepository.deleteEmp(emp);
    }
}

export default EmployeeService;