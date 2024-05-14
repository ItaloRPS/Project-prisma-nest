import { empresa } from '@prisma/client';

export class EmpresaEntity implements empresa {
  idempresa: number;
  idpais: number;
  idestado: number;
  idcidade: number;
  status: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
}
