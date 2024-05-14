import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type PrimaClientError = PrismaClientKnownRequestError &{
    meta?: {target:string}
}