import { DatabaseError } from "../types/databaseError";
import {PrimaClientError} from "../types/prismaClientError"
import { UniqueConstraintError } from "../types/uniqueCostraintError";
enum PrismaErros{
    UniqueContraintFail = 'P2002'
}

export const handeçDatabaseErros = (e:PrimaClientError):Error=>{
  switch (e.code) {
    case PrismaErros.UniqueContraintFail:
        return new UniqueConstraintError(e)
  
    default:
        return new DatabaseError(e.message)
  }
}