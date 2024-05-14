import { UserEntity } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto extends UserEntity {
  id: number;
  
  @ApiProperty({
    example: 'email@email.com',
    description:
      'O e-mail é necessário para o login.',
  })
  @IsEmail({}, { message: 'O e-mail deve estar em um formato válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @ApiProperty({
    example: '123456',
    description:
      'É necessário informar uma senha.',
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @ApiProperty({
    example: 'Paulo Salvatore',
    description:
      'O nome será utilizado para qualquer coisa (Perfil, Home Page, etc.) que precise exibir informações da pessoa conectada.',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsOptional()
  idperfil: number;

  @IsOptional()
  status: string;

  passwordResetToken: string;
  passwordResetExpires: Date;
}
