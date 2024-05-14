import { acesso } from '@prisma/client';

export class AcessoEntity implements acesso {
  idacesso: number;
  idlote: number;
  link: string;
  hash: string;
}
