import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({description:'Email do Usuário'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({description:'Nome do Usuário'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description:'Define se o Usuário é adm',
              default: false})
    @IsString()
    @IsNotEmpty()
    admin: boolean;
}
