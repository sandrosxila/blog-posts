import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

type Ctor = { new (...args: any[]): any };

export function Serialize<T extends Ctor>(dto: T) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T extends Ctor> implements NestInterceptor {
  constructor(private readonly dto: T) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
