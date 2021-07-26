import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService:PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY
    });
  }

  async validate(payload: any) {
    const user = await this.prismaService.user.findUnique({
        where:{id:payload.userId},
        include:{Staff:true}
    });
    if(!user){
        throw new NotFoundException('ไม่พบข้อมูลนี้');
    }
    
    return {
        id:user.id,
        email:user.email,
        fullname:user.Staff.fullname,
        createdAt : user.createdAt
    };

  }
}