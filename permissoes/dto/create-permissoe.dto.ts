import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PermissoeEntity } from '../entities/permissoe.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissoeDto extends PermissoeEntity {
  idpermissoes: number;
  
  // ID do Perfil associado a permissão
  @ApiProperty({
    example: '1',
    description: `Id do Perfil.`,
  })
  @IsNotEmpty({ message: 'O ID do perfil não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do perfil deve ser um número.' })
  idperfil: number;

  // Label do menu para a permissão
  @ApiProperty({
    example: 'Produto',
    description: `Label do menu.`,
  })
  @IsNotEmpty({ message: 'O nome do menu não pode estar vazio.' })
  @IsString({ message: 'O nome do menu deve ser uma string.' })
  nome: string;

  @ApiProperty({
    example: 'ClusterOutlined',
    description: `Icone da biblioteca do ant design.`,
  })
  @IsNotEmpty({ message: 'O Icone do menu não pode estar vazio.' })
  @IsString({ message: 'O Icone do menu deve ser uma string.' })
  icone: string;

  // Rota associada à permissão
  @ApiProperty({
    example: '/produto',
    description: `Rota.`,
  })
  @IsNotEmpty({ message: 'A rota não pode estar vazia.' })
  @IsString({ message: 'A rota deve ser uma string.' })
  rota: string;

  // Indicador de permissão de consulta
  @ApiProperty({
    example: '1',
    description: `Consultar.`,
  })
  @IsNotEmpty({ message: 'O campo de consulta não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo de consulta deve ser um número.' })
  consultar: number;

  // Indicador de permissão de inserção
  @ApiProperty({
    example: '1',
    description: `Inserir.`,
  })
  @IsNotEmpty({ message: 'O campo de inserção não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo de inserção deve ser um número.' })
  inserir: number;

  // Indicador de permissão de alteração
  @ApiProperty({
    example: '1',
    description: `Alterar.`,
  })
  @IsNotEmpty({ message: 'O campo de alteração não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo de alteração deve ser um número.' })
  alterar: number;

  // Indicador de permissão de exclusão
  @ApiProperty({
    example: '1',
    description: `Deletar.`,
  })
  @IsNotEmpty({ message: 'O campo de exclusão não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo de exclusão deve ser um número.' })
  deletar: number;
}
