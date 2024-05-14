import { ApiProperty } from '@nestjs/swagger';
import { temaitem } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTemaItemDto implements temaitem {
  idtemaitem: number;

  @ApiProperty({
    example: 1,
    description: 'ID do Tema.',
  })
  @IsNotEmpty({ message: 'O ID do tema não pode estar vazio.' })
  idtema: number;

  @ApiProperty({
    example: 'Descrição do item',
    description: 'Descrição.',
  })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao: string;

  @ApiProperty({
    example: 'https://exemplo.com/link',
    description: 'Link.',
  })
  @IsString({ message: 'O link deve ser uma string.' })
  link: string;

  @ApiProperty({
    example: 'Ícone do item',
    description: 'Ícone.',
  })
  @IsNotEmpty({ message: 'O ícone não pode estar vazio.' })
  @IsString({ message: 'O ícone deve ser uma string.' })
  icone: string;
}
