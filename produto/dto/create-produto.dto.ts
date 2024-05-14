/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ProdutoEntity } from '../entities/produto.entity';

export class CreateProdutoDto extends ProdutoEntity {
  idproduto: number;

  @ApiProperty({
    example: 1,
    description: `Id da Empresa.`,
  })
  @IsNotEmpty({ message: 'O id da empresa não pode estar vazio.' })
  @IsNumber({}, { message: 'O id da empresa deve ser um número.' })
  idempresa: number;

  @ApiProperty({
    example: 1,
    description: `Id de configuração do produto.`,
  })
  @IsNotEmpty({ message: 'O id de configuração do produto não pode estar vazio.' })
  @IsNumber({}, { message: 'O id de configuração do produto deve ser um número.' })
  idconfigproduto: number;

  @ApiProperty({
    example: 'A',
    description: `Status do produto.`,
  })
  @IsNotEmpty({ message: 'O status do produto não pode estar vazio.' })
  @IsString({ message: 'O status do produto deve ser uma string.' })
  status: string;

  @ApiProperty({
    example: 'example.com/imagem',
    description: `URL da imagem do produto.`,
  })
  @IsNotEmpty({ message: 'A URL da imagem não pode estar vazia.' })
  imagem: string;

  @ApiProperty({
    example: 'Nome do Produto',
    description: `Nome do produto.`,
  })
  @IsNotEmpty({ message: 'A descrição do produto não pode estar vazia.' })
  @IsString({ message: 'A descrição do produto deve ser uma string.' })
  nome: string;

  @ApiProperty({
    example: 1,
    description: `Necessidade de cadastro.`,
  })
  @IsNotEmpty({ message: 'O campo de necessidade de cadastro não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo de necessidade de cadastro deve ser um número.' })
  necessitacadastro: number;

  @ApiProperty({
    example: 1,
    description: `Edição de template.`,
  })
  @IsNotEmpty({ message: 'O campo de edição de template não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo de edição de template deve ser um número.' })
  editatemplate: number;

  @ApiProperty({
    example: 'example.com/configimagem',
    description: `URL de configuração da imagem.`,
  })
  @IsOptional()
  configimagem: string;

  @ApiProperty({
    example: 'example.com/configvideo',
    description: `URL de configuração do vídeo.`,
  })
  @IsOptional()
  configvideo: string;

  @ApiProperty({
    example: 'example.com/configimagemfundo',
    description: `URL de configuração da imagem de fundo.`,
  })
  @IsOptional()
  configimagemfundo: string;

  @ApiProperty({
    example: 'Descrição do produto',
    description: `Descrição de configuração.`,
  })
  @IsString({ message: 'A descrição de configuração deve ser uma string.' })
  @IsOptional()
  configdescricao: string;

  @ApiProperty({
    example: 'example.com/configimagembaner',
    description: `URL de configuração do banner.`,
  })
  @IsOptional()
  configimagembaner: string;

  @ApiProperty({
    example: 'example.com/configlinkbaner',
    description: `URL de configuração do link do banner.`,
  })
  @IsOptional()
  configlinkbaner: string;

  @ApiProperty({
    example: 'URL',
    description: `URL para redirecionamento.`,
  })
  @IsOptional()
  url: string;

  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
}
