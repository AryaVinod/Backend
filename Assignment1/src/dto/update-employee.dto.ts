import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import UpdateAddressDto from "./update-address.dto";
import { Type } from "class-transformer";
import Address from "../entity/address.entity";
import Role from "../utils/role.enum";

export class UpdateEmployeeDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    username: string;

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address: Address;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    joiningDate : string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    experience : number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    departmentId : number;
  }