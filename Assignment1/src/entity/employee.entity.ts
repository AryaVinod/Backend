import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract.entity";
import Role from "../utils/role.enum";
import { Department } from "./department.entity";

@Entity("employees")
class Employee extends AbstractEntity{

    @Column()
    name: string;

    @Column()
    username: string;

    @OneToOne(()=> Address, (address)=>address.employee, {cascade: true})
    address: Address;

    @Column()
    password: string;

    @Column()
    experience: number;

    @Column({default: Role.DEVELOPER})
    role: Role;

    @Column()
    joiningDate: string;

    @ManyToOne(()=> Department, (department) => department.employees, {cascade: true})
    @JoinColumn()
    department_id: Department;
}

export default Employee;