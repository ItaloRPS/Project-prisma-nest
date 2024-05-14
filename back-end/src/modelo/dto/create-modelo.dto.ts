/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { modelo } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModeloDto implements modelo {
  idmodelo: number;

  @ApiProperty({
    example: 'A',
    description: `Status.`,
  })
  @IsNotEmpty({ message: 'O status do modelo é obrigatório.' })
  @IsString({ message: 'O status do modelo deve ser uma string.' })
  status: string;

  @ApiProperty({
    example: 'modelo 1',
    description: `Descrição.`,
  })
  @IsNotEmpty({ message: 'O nome do modelo é obrigatório.' })
  @IsString({ message: 'O nome do modelo deve ser uma string.' })
  nome: string;
}
