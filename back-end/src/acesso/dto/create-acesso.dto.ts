import { ApiProperty } from '@nestjs/swagger';
import { acesso } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateAcessoDto implements acesso {
  idacesso: number;

  @ApiProperty({
    example: 1,
    description: 'ID do lote associado ao acesso.',
  })
  @IsNotEmpty({
    message: 'O ID do lote é obrigatório.',
  })
  @IsNumber({}, { message: 'O ID do lote deve ser um número.' })
  idlote: number;

  @ApiProperty({
    example: 'https://example.com',
    description: 'Link associado ao acesso.',
  })
  @IsOptional()
  @IsUrl({}, { message: 'O link deve ser uma URL válida.' })
  link: string;

  @ApiProperty({
    example: 'hash123',
    description: 'Hash associado ao acesso.',
  })
  @IsOptional()
  @IsString({ message: 'O hash deve ser uma string.' })
  hash: string;
}
