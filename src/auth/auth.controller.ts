import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth-guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}

    @Post('register')
    async register(@Body() body: UserDto) {
        const user = await this.authService.register(body); 
        return user;
    }

    @Post('login')
    async login(@Body() body: UserDto) {
        const tokenData = await this.authService.login(body.email,body.password);
        return tokenData;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req:any) {
        return req.user;
    }

}
