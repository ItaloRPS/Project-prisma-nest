import { ApiProperty } from '@nestjs/swagger';
import { tema } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTemaDto implements tema {
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
  idtema: number;

  @ApiProperty({
    example: 'Tema 1',
    description: 'Nome tema default.',
  })
  @IsOptional()
  nomeTema: string;

  @ApiProperty({
    example: 'CEO',
    description: 'Nome da ocupação.',
  })
  @IsOptional()
  ocupacao: string;
  
  @ApiProperty({
    example: 1,
    description: 'ID do Lote.',
  })
  @IsOptional()
  idlote: number;


  @ApiProperty({
    example: 'https://example.com/logo',
    description: 'Logo.',
  })
  @IsOptional()
  @IsString({ message: 'A logo deve ser uma string.' })
  logo: string;

  @ApiProperty({
    example: '#ffffff',
    description: 'Cor de fundo.',
  })
  @IsOptional()
  @IsString({ message: 'A cor de fundo deve ser uma string.' })
  bgcolor: string;

  @ApiProperty({
    example: '#000000',
    description: 'Cor do texto.',
  })
  @IsOptional()
  @IsString({ message: 'A cor do texto deve ser uma string.' })
  textcolor: string;

  @ApiProperty({
    example: 'https://example.com/imagem',
    description: 'Imagem.',
  })
  @IsOptional()
  @IsString({ message: 'A imagem deve ser uma string.' })
  imagem: string;

  @ApiProperty({
    example: 'https://example.com/video',
    description: 'Vídeo.',
  })
  @IsOptional()
  @IsString({ message: 'O vídeo deve ser uma string.' })
  video: string;

  @ApiProperty({
    example: 'Descrição do layout',
    description: 'Descrição.',
  })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao: string;

  @ApiProperty({
    example: 1,
    description: 'ID do Lote.',
  })
  @IsOptional()
  idacesso: number;

  @ApiProperty({
    example: 'Nome do layout',
    description: 'Nome.',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @ApiProperty({
    example: '#a0a0a0',
    description: 'Cor do container.',
  })
  @IsOptional()
  @IsString({ message: 'A cor do container deve ser uma string.' })
  containerColor: string;

  @IsOptional()
  @IsString({ message: 'reutilizar deve ser uma string.' })
  reutilizar: string;

  
}
