import { DataSource } from "typeorm";
import {DepartmentRepository} from "../../repository/department.repository";
import {DepartmentService} from "../../service/department.service";
import {Department} from "../../entity/department.entity";
import { plainToInstance } from "class-transformer";
import { when } from "jest-when";
import { CreateDepartmentDto } from "../../dto/create-department.dto";
import { UpdateDepartmentDto } from "../../dto/update-department.dto";

describe('Department Service tests', ()=>{

    let deptService: DepartmentService;
    let deptRepository: DepartmentRepository;
    let dept: Department = plainToInstance(Department, {id: 1})

    beforeAll(()=>{

        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;

        deptRepository =new DepartmentRepository(dataSource.getRepository(Department));
        deptService = new DepartmentService(deptRepository);
    })

    describe("Test for get dept by id", ()=> {

        test("Test department", async()=>{

            const mockedFunction = jest.fn();
            when(mockedFunction).calledWith(1).mockResolvedValueOnce(dept);
            deptRepository.getDepartment = mockedFunction;
            const department = await deptService.getDepartmentByID(1);
            expect(department).toBe(dept);
        });
    });

    describe("Create department", ()=> {
        test("Should create department succesfully",async () => {
            const spy = jest.spyOn(deptRepository, 'createDepartment');
            const deptDto: CreateDepartmentDto= plainToInstance(CreateDepartmentDto, {name: "HR"});
            spy.mockResolvedValue(dept);
            const users = await deptService.createDepartment(deptDto);
            expect(users).toStrictEqual(dept);
            expect(spy).toBeCalledTimes(1);
            
        })

    });

    describe("Get all department", ()=> {
        test("Should return departments succesfully",async () => {
            const spy = jest.spyOn(deptRepository, 'getAllDepartments');
            spy.mockResolvedValue([]);
            const users = await deptService.getAllDepartments();
            expect(users).toStrictEqual([]);
            expect(spy).toBeCalledTimes(1);
            
        })

    })

    describe("Update department", ()=> {
        test("Should update department succesfully",async () => {
            const mockedFunction = jest.fn();
            const spy = jest.spyOn(deptRepository, 'updateDepartment');
            spy.mockResolvedValue(dept);
            when(mockedFunction).calledWith(1).mockResolvedValueOnce(dept);
            deptRepository.getDepartment = mockedFunction;
            const deptDto: UpdateDepartmentDto= plainToInstance(UpdateDepartmentDto, {name: "HR"});
            const users = await deptService.updateDepartment(1, deptDto);
            expect(users).toStrictEqual(dept);
            expect(spy).toBeCalledTimes(1);
            
        })

    })

    describe("Delete dept", ()=> {
        test("Should delete department succesfully",async () => {
            const mockedFunction = jest.fn();
            const spy = jest.spyOn(deptRepository, 'deleteDepartment');
            spy.mockResolvedValue(dept);
            when(mockedFunction).calledWith(1).mockResolvedValue(dept);
            // deptRepository.deleteDepartment = mockedFunction;
            const users = await deptService.deleteDepartment(1);
            expect(users).toStrictEqual(dept);
            expect(spy).toBeCalledTimes(1);            
        })

    });
});