import { lojista } from '@prisma/client';
export class LojistaEntity implements lojista{
    idempresa: number;
    idlojista: number;
    idUser: number;
    idpais: number;
    idestado: number;
    idcidade: number;
}
