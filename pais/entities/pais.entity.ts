import { pais } from '@prisma/client';

export class PaisEntity implements pais {
  idpais: number;
  codpais: string;
  descricao: string;
}
