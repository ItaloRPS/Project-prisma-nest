import { modelo } from '@prisma/client';

export class ModeloEntity implements modelo {
  idmodelo: number;
  status: string;
  nome: string;
}
