import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Tambahkan logika kustom jika diperlukan di sini
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Anda dapat menambahkan pengecekan kustom atau modifikasi respons di sini
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
