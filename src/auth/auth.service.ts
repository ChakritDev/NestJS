import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { hash, compare, genSalt } from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async register(body: UserDto) {
        const {email, password} = body;
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: email,
                    password: hashedPassword
                    
                },
                select: {
                    id: true,
                    email: true
                }
            });

            return user; 
        } catch (e) {
            if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'){
                throw new  ConflictException('อีเมลนี้มีผู้ใช้งานแล้ว');
            }
            throw new Error(e)
        }
    }

    async login(email:string,password:string) {
        const user = await this.prismaService.user.findUnique({
            where:{ email : email }
        });
        if(!user){
            throw new NotFoundException('ไม่พบข้อมูลนี้ในระบบ');
        }
        // เปรียบเทียบรหัสผ่านว่าตรงกันหรือไม่
        const isValid = await compare(password,user.password);
        if(!isValid){
            throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง');
        }

        // generate token
        const token = await this.jwtService.signAsync({userId:user.id});

        return {
            tokenType: 'Bearer',
            accessToken: token
        };
    }

}
