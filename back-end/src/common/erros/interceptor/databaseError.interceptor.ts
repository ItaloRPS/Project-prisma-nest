import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DatabaseError } from '../types/databaseError';
import { handeçDatabaseErros } from '../utils/handle-database-erros.util';
import { isPrismaError } from '../utils/is-prisma-error.util';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(error =>{
          if (isPrismaError(error)) {
            error = handeçDatabaseErros(error)
            }
          if (error instanceof DatabaseError) {
            throw new BadRequestException(error.message)
          }else{
            throw error
          }
        })
      );
  }
}