import { ApiProperty } from '@nestjs/swagger';
import { numBytes } from 'aws-sdk/clients/finspace';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsArray, isNumber } from 'class-validator';
import { CreateLoteDto } from 'src/lote/dto/create-lote.dto';
import { MessageEntity } from "../entities/message.entity";

export class CreateMessageDto extends MessageEntity{


  @ApiProperty({
    example: 1,
    description: `Id da empresa.`,
  })
  @IsNotEmpty({ message: 'O id da empresa não pode estar vazio.' })
  @IsNumber({}, { message: 'O id da empresa deve ser um número.' })
  idempresa: number;

  @ApiProperty({
    example: 'idwhatsapp',
    description: `idwhatsapp da mensagem.`,
  })
  @IsNotEmpty({ message: 'O idwhatsapp da mensagem não pode estar vazio.' })
  @IsNumber({}, { message: 'O idwhatsapp da mensagem deve ser um numrero.' })
  idwhatsapp: number;

  @ApiProperty({
    example: 1,
    description: `texto da mensagem.`,
  })
  @IsNotEmpty({ message: 'O texto não pode estar vazio.' })
  @IsString({ message: 'mensagem deve ser um texto.' })
  texto: string;

  @ApiProperty({
    example: 1,
    description: `descricao da mensagem.`,
  })
  @IsNotEmpty({ message: 'a descricao não pode estar vazio.' })
  @IsString({ message: 'descricao deve ser um texto.' })
  descricao: string;

  @ApiProperty({
    example: 'A',
    description: `data da mensagem.`,
  })
  @IsOptional({ message: 'Data da mensagem não pode estar vazio.' })
  @IsString({ message: 'Data da mensagem deve ser uma string.' })
  data: string;

  @ApiProperty({
    example: 'hora',
    description: `hora da mensagem.`,
  })
  @IsOptional({ message: 'Hora da mensagem não pode estar vazio.' })
  @IsString({ message: 'Hora da mensagem deve ser uma string.' })
  hora: string;

  @ApiProperty({
    example: 'idcidade',
    description: `idcidade da mensagem.`,
  })
  @IsOptional({ message: 'O idcidade da mensagem não pode estar vazio.' })
  @IsNumber({},{ message: 'O idcidade da mensagem deve ser um numero.' })
  idcidade: number;

  @ApiProperty({
    example: 'idcidade',
    description: `idcidade da mensagem.`,
  })
  @IsOptional({ message: 'O idestado da mensagem não pode estar vazio.' })
  @IsNumber({},{ message: 'O idestado da mensagem deve ser um numero.' })
  idestado: number;

  @ApiProperty({
    example: 'idcidade',
    description: `idcidade da mensagem.`,
  })
  @IsNotEmpty({ message: 'O idproduto da mensagem não pode estar vazio.' })
  @IsNumber({},{ message: 'O idproduto da mensagem deve ser um numero.' })
  idproduto: number;
  
  // @ApiProperty({
  //   example: 'fone',
  //   description: `fone da mensagem.`,
  // })
  // @IsNotEmpty({ message: 'O fone da mensagem não pode estar vazio.' })
  // @IsString({ message: 'O fone da mensagem deve ser um numero.' })
  // fone: string;
  

  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;

  @ApiProperty({
    example: 'idlote',
    description: `idlote do lote.`,
  })
  @IsNotEmpty({ message: 'idlote do lote não pode estar vazio.' })
  @IsArray({ message: 'idlote do lote deve ser uma array.' })
  lotes: Array<CreateLoteDto>



}
