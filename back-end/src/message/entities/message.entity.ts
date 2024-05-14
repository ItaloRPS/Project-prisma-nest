import { mensagem } from '@prisma/client';

export class MessageEntity implements mensagem {
    idmensagem: number;
    idempresa: number;
    idwhatsapp: number;
    idproduto: number;
    idestado: number;
    idcidade: number;
    descricao: string;
    texto: string;
    data: string;
    hora: string;
    status: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}