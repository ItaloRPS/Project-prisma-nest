import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PerfilEntity } from '../entities/perfil.entity';

export class CreatePerfilDto extends PerfilEntity {
  idperfil: number;
  
  @ApiProperty({
    example: 'A',
    description: `Status do usuário.`,
  })
  @IsNotEmpty({ message: 'O status do usuário não pode estar vazio.' })
  @IsString({ message: 'O status do usuário deve ser uma string.' })
  status: string;

  @ApiProperty({
    example: 'Admin',
    description: `Nome do perfil.`,
  })
  @IsNotEmpty({ message: 'O nome do perfil não pode estar vazio.' })
  @IsString({ message: 'O nome do perfil deve ser uma string.' })
  nome: string;
}
