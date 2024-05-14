import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { lojista } from 'prisma/prisma-client';
export class CreateLojistaDto implements lojista{
    idlojista: number;
    
    @ApiProperty({
        example: '1',
        description: `ID do usuário.`,
    })
    @IsNotEmpty({ message: 'O ID do usuário não pode estar vazio.' })
    @IsNumber({}, { message: 'O ID do usuário deve ser um número.' })
    idUser: number;
    
    @ApiProperty({
        example: '1',
        description: `ID do pais.`,
    })
    @IsNotEmpty({ message: 'O ID do pais não pode estar vazio.' })
    @IsNumber({}, { message: 'O ID do pais deve ser um número.' })
    idpais: number;

    @ApiProperty({
        example: '1',
        description: `ID do estado.`,
    })
    @IsNotEmpty({ message: 'O ID do estado não pode estar vazio.' })
    @IsNumber({}, { message: 'O ID do estado deve ser um número.' })
    idestado: number;

    @ApiProperty({
        example: '1',
        description: `ID da cidade.`,
    })
    @IsNotEmpty({ message: 'O ID da cidade não pode estar vazio.' })
    @IsNumber({}, { message: 'O ID da cidade deve ser um número.' })
    idcidade: number;

    @ApiProperty({
        example: '1',
        description: `ID da emrpesa.`,
    })
    @IsNotEmpty({ message: 'O ID da emrpesa não pode estar vazio.' })
    @IsNumber({}, { message: 'O ID da emrpesa deve ser um número.' })
    idempresa: number;
}
