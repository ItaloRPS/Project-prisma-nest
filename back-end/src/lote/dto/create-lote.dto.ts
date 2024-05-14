import { ApiProperty } from '@nestjs/swagger';
import { lote } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateLoteDto implements lote {
  idlote: number;

  @ApiProperty({
    example: '1',
    description: `ID do Produto.`,
  })
  @IsNotEmpty({ message: 'O ID do produto não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do produto deve ser um número.' })
  idproduto: number;

  @ApiProperty({
    example: '1',
    description: `ID do Template.`,
  })
  @IsNotEmpty({ message: 'O ID do template não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do template deve ser um número.' })
  idmodelo: number;

  @ApiProperty({
    example: '1',
    description: `Código do Lote.`,
  })
  @IsNotEmpty({ message: 'O código do lote não pode estar vazio.' })
  @IsString({ message: 'O código do lote deve ser uma string.' })
  codigo: string;

  @ApiProperty({
    example: '1',
    description: `Quantidade`,
  })
  @IsNotEmpty({ message: 'A quantidade não pode estar vazia.' })
  @IsNumber({}, { message: 'A quantidade deve ser um número.' })
  quantidade: number;

  @ApiProperty({
    example: 'dd/mm/yyyy',
    description: `Data de Ativação `,
  })
  @IsOptional()
  dtativacao: Date;

  @ApiProperty({
    example: '1',
    description: `Liberado`,
  })
  @IsNotEmpty({ message: 'O campo "liberado" não pode estar vazio.' })
  @IsString({ message: 'O campo "liberado" deve ser uma string.' })
  liberado: string;
}
