import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    if (!request.CurrentUser) {
      return false;
    }
    return request.CurrentUser.admin; //kalau properti admin ada nilai 1 maka nilainya true
  }
}
