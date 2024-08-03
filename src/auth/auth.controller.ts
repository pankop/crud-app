import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { UserDto } from '../users/dto/user.dto';
import { Serialize } from '../interceptors/serialize.interceptors';
import { JwtAuthGuard } from '../guards/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() body: CreateUserDto) {
    const { user, access_token } = await this.authService.register(
      body.name,
      body.email,
      body.password,
    );
    console.log({ user, access_token });
    return { user, access_token };
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async login(@Body() body: LoginUserDto) {
    const { user, access_token } = await this.authService.login(
      body.email,
      body.password,
    );
    console.log({ user, access_token });
    return { user, access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/whoami')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: UserDto,
  })
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
