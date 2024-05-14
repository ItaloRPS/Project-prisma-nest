import { ApiProperty } from '@nestjs/swagger';
import { cidade } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCidadeDto implements cidade {
  idcidade: number;

  @ApiProperty({
    example: 1,
    description: 'ID do estado associado à cidade.',
  })
  @IsNumber({}, { message: 'O ID do estado deve ser um número.' })
  @IsNotEmpty({
    message: 'O ID do estado é obrigatório.',
  })
  readonly idestado: number;

  @ApiProperty({
    example: '12345',
    description: 'Código da cidade.',
  })
  @IsString({ message: 'O código da cidade deve ser uma string.' })
  @IsNotEmpty({
    message: 'O código da cidade é obrigatório.',
  })
  readonly codcidade: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Descrição da cidade.',
  })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({
    message: 'A descrição é obrigatória.',
  })
  readonly descricao: string;
}
