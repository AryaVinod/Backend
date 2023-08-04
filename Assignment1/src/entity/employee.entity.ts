import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from "typeorm";
import Address from "./address.entity";

@Entity("employees")
class Employee{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable:true})
    age: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(()=> Address, (address)=>address.employee, {cascade: true})
    address: Address;
}

export default Employee;