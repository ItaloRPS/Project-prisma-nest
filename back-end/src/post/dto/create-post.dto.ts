import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEmail} from "class-validator";

export class CreatePostDto {
    @ApiProperty({description:'Titulo do post'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({description:'Conteudo do post'})
    @IsString()
    @IsOptional()
    content?: string;
    
    @ApiProperty({description:'Email do autor'})
    @IsEmail()
    authorEmail: string;
}
