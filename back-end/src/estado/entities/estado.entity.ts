import { estado } from '@prisma/client';

export class EstadoEntity implements estado {
  idestado: number;
  idpais: number;
  codetd: string;
  descricao: string;
}
