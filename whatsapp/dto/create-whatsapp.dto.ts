import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsArray, isNumber } from 'class-validator';
import { whatsapp } from '@prisma/client';



export class CreateWhatsappDto implements whatsapp{
    idwhatsapp: number;

    @ApiProperty({
        example: 1,
        description: 'ID da empresa ',
      })
      @IsNumber({},{ message: 'O idempresa do whatsapp deve ser um número.' })
      @IsNotEmpty({ message: 'O idempresa do whatsapp não pode estar vazio.' })
      idempresa: number;

      @ApiProperty({
        example: 1,
        description: 'Endpoint do whatsapp',
      })
      @IsString({ message: 'O endpoint do whatsapp deve ser um texto.' })
      @IsOptional({ message: 'O endpoint do whatsapp não pode estar vazio.' })
      endpoint: string;

      @ApiProperty({
        example: 1,
        description: 'session do whatsapp',
      })
      @IsString({ message: 'O session do whatsapp deve ser um texto.' })
      @IsOptional({ message: 'O session do whatsapp não pode estar vazio.' })
      session: string;

      @ApiProperty({
        example: 1,
        description: 'sessionkey do whatsapp',
      })
      @IsString({ message: 'O sessionkey do whatsapp deve ser um texto.' })
      @IsOptional({ message: 'O sessionkey do whatsapp não pode estar vazio.' })
      sessionkey: string;

      @ApiProperty({
        example: 1,
        description: 'description do whatsapp',
      })
      @IsString({ message: 'O token do whatsapp deve ser um texto.' })
      @IsOptional({ message: 'O token do whatsapp não pode estar vazio.' })
      token: string;

      @ApiProperty({
        example: 1,
        description: 'numero do whatsapp',
      })
      @IsString({ message: 'O Numero do whatsapp deve ser um Stexto' })
      @IsNotEmpty({ message: 'O Numero do whatsapp não pode estar vazio.' })
      numero: string;

      created_at: Date;
      created_by: string;
      updated_at: Date;
      updated_by: string;
  
}
