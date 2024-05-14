import { ApiProperty } from '@nestjs/swagger';
import { estado } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEstadoDto implements estado {
  idestado: number;

  @ApiProperty({
    example: 1,
    description: 'ID do País.',
  })
  @IsNumber({}, { message: 'O ID do país deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do país não pode estar vazio.' })
  idpais: number;

  @ApiProperty({
    example: '1',
    description: 'Código do Estado.',
  })
  @IsString({ message: 'O código do estado deve ser uma string.' })
  @IsNotEmpty({ message: 'O código do estado não pode estar vazio.' })
  codetd: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Nome do Estado.',
  })
  @IsString({ message: 'A descrição do estado deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  descricao: string;
}
