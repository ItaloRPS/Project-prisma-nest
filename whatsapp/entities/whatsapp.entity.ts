import { whatsapp } from "@prisma/client";

export class WhatsappEntity implements whatsapp {
    idwhatsapp: number;
    idempresa: number;
    endpoint: string;
    session: string;
    sessionkey: string;
    token: string;
    numero: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}