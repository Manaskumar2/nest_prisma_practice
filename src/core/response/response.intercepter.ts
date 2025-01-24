import { Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data && !data.statusCode) {
          // Wrap the response in a standard format, only if it's not already wrapped
          return {
            statusCode: 200,
            message: 'Request successful',
            data,
          };
        }
        return data;
      }),
    );
  }
}
