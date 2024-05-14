import { cidade } from '@prisma/client';

export class CidadeEntity implements cidade {
  idcidade: number;
  idestado: number;
  codcidade: string;
  descricao: string;
}
