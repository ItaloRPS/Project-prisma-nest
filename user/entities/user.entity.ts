import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  password: string;
  name: string;
  idperfil: number;
  status: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
}
