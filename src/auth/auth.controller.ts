import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDtoModel } from './models/dto/user-login-dto.model';
import { UserLoginSuccessDtoModel } from './models/dto/user-login-success-dto.model';
import { IsPublic } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //~ This is so it won't require API Key
  //   @IsPublic(true)
  //* Modified
  @IsPublic()
  //~ Subpath
  @Post('login')
  login(
    @Body() loginDto: UserLoginDtoModel,
  ): Promise<UserLoginSuccessDtoModel> {
    return this.authService.loginUser(loginDto);
  }
}
