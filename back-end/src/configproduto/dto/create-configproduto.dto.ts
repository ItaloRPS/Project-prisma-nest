import { ApiProperty } from '@nestjs/swagger';
import { config_produto } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConfigprodutoDto implements config_produto {
  idconfigproduto: number;

  @IsNotEmpty({ message: 'O campo status não pode estar vazio.' })
  @IsString({ message: 'O campo status deve ser uma string.' })
  status: string;

  @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
  @IsString({ message: 'O campo nome deve ser uma string.' })
  nome: string;
}
