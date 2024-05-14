import { ApiProperty } from '@nestjs/swagger';
import { empresa } from '@prisma/client';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsNumber, IsString } from 'class-validator';

export class CreateEmpresaDto implements empresa {
  idempresa: number;

  @ApiProperty({
    example: 2,
    description: 'ID do País.',
  })
  @IsNumber({}, { message: 'O ID do país deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do país é obrigatório.' })
  idpais: number;

  @ApiProperty({
    example: 2,
    description: 'ID do Estado.',
  })
  @IsNumber({}, { message: 'O ID do estado deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do estado é obrigatório.' })
  idestado: number;

  @ApiProperty({
    example: 2,
    description: 'ID da Cidade.',
  })
  @IsNumber({}, { message: 'O ID da cidade deve ser um número.' })
  @IsNotEmpty({ message: 'O ID da cidade é obrigatório.' })
  idcidade: number;

  @ApiProperty({
    example: 'A',
    description: 'Status da Empresa.',
  })
  @IsString({ message: 'O status deve ser uma string A ou I.' })
  @IsNotEmpty({ message: 'O status é obrigatório.' })
  status: string;

  @ApiProperty({
    example: 'Nome da Empresa',
    description: 'Nome da Empresa.',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @ApiProperty({
    example: '00.000.000/0001-00',
    description: 'CNPJ da Empresa.',
  })
  @IsString({ message: 'O CNPJ deve ser uma string.' })
  @IsNotEmpty({ message: 'O CNPJ é obrigatório.' })
  cnpj: string;

  @ApiProperty({
    example: 'empresa@teste.com',
    description: 'Email da Empresa.',
  })
  @IsEmail({}, { message: 'O email deve estar em um formato válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @ApiProperty({
    example: '(00) 0000-0000',
    description: 'Telefone da Empresa.',
  })
  @IsPhoneNumber('BR', { message: 'O telefone deve ser um número de telefone válido no formato brasileiro.' })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  telefone: string;
}
