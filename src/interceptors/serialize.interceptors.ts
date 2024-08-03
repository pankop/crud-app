import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { UserDto } from '../users/dto/user.dto';

interface ClassConstructor {
  new (...args: any[]): object; // nah ini agar dto yang kita kirimkan nanti di bagian pemanggilan tuh parameter harus berupa object dan pasti gitu
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
} // functional construtor

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run something before a req is handled by the req handler
    // console.log('running before handler/controller');

    return next.handle().pipe(
      //run somthing after a req is handled by req handler
      map((data: any) => {
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true, // menampilkan hal yang udh disepakati pada user Dto
        });
      }),
    );
  }
}
