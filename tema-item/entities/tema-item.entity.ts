import { temaitem } from '@prisma/client';

export class TemaItemEntity implements temaitem {
  idtemaitem: number;
  idtema: number;
  descricao: string;
  link: string;
  icone: string;
}
