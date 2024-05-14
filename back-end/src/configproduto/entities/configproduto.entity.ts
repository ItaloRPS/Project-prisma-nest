import { config_produto } from '@prisma/client';

export class ConfigprodutoEntity implements config_produto {
  idconfigproduto: number;
  status: string;
  nome: string;
}
