import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity("departments")
export class Department extends AbstractEntity{

    @Column()
    name: string;

    @OneToMany(()=> Employee, (employee) => employee.department)
    @JoinColumn()
    employees: Employee[];
}