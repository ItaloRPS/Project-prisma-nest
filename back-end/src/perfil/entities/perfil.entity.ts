/* eslint-disable prettier/prettier */
import { perfil } from "@prisma/client";

export class PerfilEntity implements perfil {
  idperfil: number;
  status: string;
  nome: string;
}
