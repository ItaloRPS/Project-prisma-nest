import { ConflictError } from "./conflictError";
import { PrimaClientError } from "./prismaClientError";

export class UniqueConstraintError extends ConflictError{
   constructor(e: PrimaClientError){
       const uniqueField = e.meta.target
       super(`a record with this ${uniqueField} already exists`);
    }
    
}