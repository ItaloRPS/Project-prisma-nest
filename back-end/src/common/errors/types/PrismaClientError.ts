// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export type PrismaClientError = PrismaClientKnownRequestError & {
  meta?: { target: string };
};
