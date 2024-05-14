import { ApiProperty } from '@nestjs/swagger';
import { pais } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaisDto implements pais {
  idpais: number;

  @ApiProperty({
    example: '1',
    description: `Código.`,
  })
  @IsNotEmpty({ message: 'O código do país não pode estar vazio.' })
  @IsString({ message: 'O código do país deve ser uma string.' })
  codpais: string;

  @ApiProperty({
    example: '1',
    description: `Descrição.`,
  })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao: string;
}
