import { tema } from '@prisma/client';

export class TemaEntity implements tema {
  idtema: number;
  idlote: number;
  idacesso: number;
  nomeTema: string;
  ocupacao: string;
  logo: string;
  bgcolor: string;
  textcolor: string;
  imagem: string;
  video: string;
  descricao: string;
  nome: string;
  containerColor: string;
  reutilizar:string;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
}
