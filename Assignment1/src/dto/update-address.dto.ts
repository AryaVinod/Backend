import { IsNotEmpty, IsString } from "class-validator";

class UpdateAddressDto{
    
    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsNotEmpty()
    @IsString()
    line2: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    pincode: string;
}

export default UpdateAddressDto;