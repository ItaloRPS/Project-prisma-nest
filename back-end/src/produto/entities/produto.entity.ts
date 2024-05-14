import { produto } from '@prisma/client';

export class ProdutoEntity implements produto {
  idproduto: number;
  idempresa: number;
  idconfigproduto: number;
  status: string;
  imagem: string;
  nome: string;
  necessitacadastro: number;
  editatemplate: number;
  configimagem: string;
  configvideo: string;
  configimagemfundo: string;
  configdescricao: string;
  configimagembaner: string;
  configlinkbaner: string;
  url: string;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
}
