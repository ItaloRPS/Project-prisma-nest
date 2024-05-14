import { lote } from '@prisma/client';

export class LoteEntity implements lote {
  idmodelo: number;
  idlote: number;
  idproduto: number;
  codigo: string;
  quantidade: number;
  dtativacao: Date;
  liberado: string;
}
