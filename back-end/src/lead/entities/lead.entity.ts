import { lead } from '@prisma/client';

export class LeadEntity implements lead {
  idlead: number;
  idusuario: number;
  idpais: number;
  idestado: number;
  idcidade: number;
  idacesso: number;
  idlojista: number;
  nome: string;
  telefone: string;
  dtnascimento: Date;
  email: string;
}
