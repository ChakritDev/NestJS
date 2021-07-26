import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty({message: 'อีเมล์ห้ามว่าง'})
    @IsEmail({}, {message: 'รูปแบบอีเมล์ไม่ถูกต้อง'})
    email: string;
    
    @IsNotEmpty({message: 'รหัสผ่านห้ามว่าง'})
    password: string;
}