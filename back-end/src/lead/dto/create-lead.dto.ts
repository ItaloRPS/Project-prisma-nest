import { ApiProperty } from '@nestjs/swagger';
import { lead } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsNumber, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateLeadDto implements lead {
  idlead: number;

  @ApiProperty({
    example: 1,
    description: 'ID do Usuário.',
  })
  @IsNumber({}, { message: 'O ID do usuário deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do usuário não pode estar vazio.' })
  idusuario: number;

  @ApiProperty({
    example: 1,
    description: 'ID do País.',
  })
  @IsNumber({}, { message: 'O ID do país deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do país não pode estar vazio.' })
  idpais: number;

  @ApiProperty({
    example: 1,
    description: 'ID do Estado.',
  })
  @IsNumber({}, { message: 'O ID do estado deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do estado não pode estar vazio.' })
  idestado: number;

  @ApiProperty({
    example: 1,
    description: 'ID da Cidade.',
  })
  @IsNumber({}, { message: 'O ID da cidade deve ser um número.' })
  @IsNotEmpty({ message: 'O ID da cidade não pode estar vazio.' })
  idcidade: number;

  @ApiProperty({
    example: 1,
    description: 'ID de Acesso.',
  })
  @IsNumber({}, { message: 'O ID de acesso deve ser um número.' })
  @IsNotEmpty({ message: 'O ID de acesso não pode estar vazio.' })
  idacesso: number;

  @ApiProperty({
    example: 1,
    description: 'ID de Acesso.',
  })
  @IsNumber({}, { message: 'O ID do lojista deve ser um número.' })
  @IsOptional()
  idlojista: number;

  @ApiProperty({
    example: 'Carlos',
    description: 'Nome do Lead.',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Número de telefone.',
  })
  @IsString({ message: 'O telefone deve ser uma string.' })
  @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
  telefone: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Data de Nascimento.',
  })
  @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia.' })
  dtnascimento: Date;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Endereço de e-mail.',
  })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'O e-mail deve estar em um formato de e-mail válido.' })
  email: string;
}
