import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import Role from "../../utils/role.enum";

describe('Employee Srvice tests', ()=>{

    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;

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
            const emploee = {
                id: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                name: "Arya",
                age: null,
                email: "arya@gmail.com",
                password: "$2b$10$Kb8i/YUw/aJmFG/J0xQsGugR0l/Wq1U.yz2riN0phLrqShDR1xiMa",
                role: Role.DEVELOPER,
            }
            when(mockedFunction).calledWith(6).mockReturnValueOnce(emploee);
            employeeRepository.findEmployeeByID = mockedFunction;
            const employee = await employeeService.getEmployeeByID(6);
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
        
});