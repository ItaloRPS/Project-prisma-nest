import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UnautorizedError } from '../types/unautorizedError';

@Injectable()
export class UnautorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(error =>{
            if (error instanceof UnautorizedError) {
                throw new UnauthorizedException(error.message)
            }else{
                throw error
            }
        })
      );
  }
}