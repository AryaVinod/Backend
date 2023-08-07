import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import Role from "../../utils/role.enum";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../../dto/create-employee.dto";
import bcrypt from "bcrypt";
import { UpdateEmployeeDto } from "../../dto/update-employee.dto";
import jsonwebtoken from "jsonwebtoken";

describe('Employee Srvice tests', ()=>{

    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    let employee: Employee = plainToInstance(Employee, {id: 8})

    beforeAll(()=>{

        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;

        employeeRepository =new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService = new EmployeeService(employeeRepository);
    });

    describe("Test for getEmployeeByID", ()=> {

        test("Test Employee for id:1", async()=>{

            const mockedFunction = jest.fn();
            const emploee: Employee = plainToInstance(Employee, {id: 8})
            when(mockedFunction).calledWith({id:8}).mockResolvedValueOnce(emploee);
            employeeRepository.findEmployeeBy = mockedFunction;
            const employee = await employeeService.getEmployeeByID(8);
            expect(employee).toBe(emploee);
        });
    });


    describe("Get all employees", ()=> {
        test("Should return users succesfully",async () => {
            const spy = jest.spyOn(employeeRepository, 'findAllEmployee');
            spy.mockResolvedValue([]);
            const users = await employeeService.getAllEmployees();
            expect(users).toStrictEqual([]);
            expect(spy).toBeCalledTimes(1);
            
        })

    })

    describe("Create employee", ()=> {
        test("Should create employee succesfully",async () => {
            bcrypt.hash=jest.fn().mockResolvedValue("");
            const spy = jest.spyOn(employeeRepository, 'saveNewEmp');
            const employeeDto: CreateEmployeeDto= plainToInstance(CreateEmployeeDto, {id: 8, password: "mockpasswordhash", address: {
                line1: 'DLF', line2: 'New', city: 'Kochi', state: "kerala", country: "India", pincode: "123"
            }});
            spy.mockResolvedValue(employee);
            const users = await employeeService.addNewEmployee(employeeDto);
            expect(users).toStrictEqual(employee);
            expect(spy).toBeCalledTimes(1);
            
        })

    })

    describe("Delete employees", ()=> {
        test("Should delete employee succesfully",async () => {
            const mockedFunction = jest.fn();
            const spy = jest.spyOn(employeeRepository, 'deleteEmp');
            spy.mockResolvedValue(employee);
            when(mockedFunction).calledWith({id:8}).mockResolvedValueOnce(employee);
            employeeRepository.findEmployeeBy = mockedFunction;
            const users = await employeeService.deleteEmployeeByID(8);
            expect(users).toStrictEqual(employee);
            expect(spy).toBeCalledTimes(1);
            
        })

    })

    describe("Update employee", ()=> {
        test("Should update employee succesfully",async () => {
            const mockedFunction = jest.fn();
            const spy = jest.spyOn(employeeRepository, 'updateEmp');
            spy.mockResolvedValue(employee);
            when(mockedFunction).calledWith({id:8}).mockResolvedValueOnce(employee);
            employeeRepository.findEmployeeBy = mockedFunction;
            const employeeDto: UpdateEmployeeDto= plainToInstance(UpdateEmployeeDto, {id: 8, password: "mockpasswordhash", address: {
                line1: 'DLF', line2: 'New', city: 'Kochi', state: "kerala", country: "India", pincode: "123"
            }});
            const users = await employeeService.updateEmployee(8, employeeDto);
            expect(users).toStrictEqual(employee);
            expect(spy).toBeCalledTimes(1);
            
        })

    })

    // describe("Employee Login", ()=> {
    //     test("Should login succesfully",async () => {
    //         const mockedFunction = jest.fn();
    //         const spy = jest.spyOn(employeeRepository, 'updateEmp');
    //         spy.mockResolvedValue(employee);
    //         when(mockedFunction).calledWith({id:8}).mockResolvedValueOnce(employee);
    //         employeeRepository.findEmployeeBy = mockedFunction;
    //         const users = await employeeService.loginEmployee('ann', 'ann');
    //         expect(users).toStrictEqual(employee);
    //         expect(spy).toBeCalledTimes(1);
            
    //     })

    // })

    describe("Test for login",()=>{
        test(' Test for login for an Employee', async () => {
            const mockedFunction = jest.fn();
            jsonwebtoken.sign=jest.fn().mockReturnValue("eyJhbGciOiJ");
            bcrypt.compare=jest.fn().mockResolvedValue(true)
            when(mockedFunction).calledWith({username:"afri"}).mockResolvedValueOnce({
                
                "id": 8,
                "createdAt": "2023-08-07T00:50:44.014Z",
                "updatedAt": "2023-08-07T00:50:44.014Z",
                "deletedAt": null,
                "name": "Afri",
                "username": "afri",
                "password": "$2b$10$rCcjtqpVDoe136TiN0CukeaujpsWWYs6LcuaqOw21.95ldTY2tu/i",
                "experience": 8,
                "role": "Developer",
                "joiningDate": "11/02/2012",
                "address": {
                    "id": 8,
                    "createdAt": "2023-08-07T00:50:44.014Z",
                    "updatedAt": "2023-08-07T00:50:44.014Z",
                    "deletedAt": null,
                    "line1": "Edachira",
                    "line2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
                
            })
            employeeRepository.findEmployeeBy = await mockedFunction
            const result = await employeeService.loginEmployee("afri","afri");
            expect(result.token).toStrictEqual("eyJhbGciOiJ")});

            test(' Test for login fail for an Employee', async () => {
                const mockedFunction = jest.fn();
                jsonwebtoken.sign=jest.fn().mockReturnValue("eyJhbGciOiJ");
                bcrypt.compare=jest.fn().mockResolvedValue(true)
                when(mockedFunction).calledWith({username:"afri"}).mockResolvedValueOnce(null)
                employeeRepository.findEmployeeBy =mockedFunction;
                expect(async ()=> {await employeeService.loginEmployee("afri","afri")}).rejects.toThrowError();
            })
    })       


});