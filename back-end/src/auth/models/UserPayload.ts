export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  status: string;
  idempresa: number;
  idperfil: number;
  perfil: string;
  iat?: number;
  exp?: number;
}
