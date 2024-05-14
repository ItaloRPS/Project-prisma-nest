import { permissoes } from '@prisma/client';

export class PermissoeEntity implements permissoes {
  idpermissoes: number;
  idperfil: number;
  nome: string;
  rota: string;
  consultar: number;
  inserir: number;
  alterar: number;
  deletar: number;
  icone: string;
}
