import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Position, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreatePositionDto } from './dto/create-position.dto';
// import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {

  constructor(private readonly prismaService:PrismaService){}

  // แบบใช้ Dto
  // async create(createPositionDto: CreatePositionDto):Promise<Position> {
  //   const position = await this.prismaService.position.create({
  //     data:{
  //       title:createPositionDto.title
  //     }
  //   });
  //   return position;
  // }

  //ไม่ใช้ Dto 
  async create(data: Prisma.PositionCreateInput):Promise<Position> {
    const position = await this.prismaService.position.create({
      data:{
        title:data.title
      }
    });
    return position;
  }

  async findAll(): Promise<Position[]> {
    const position = await this.prismaService.position.findMany({
      orderBy:{ id: 'desc' }
    });
    return position;
  }

  async findOne(id: number) : Promise<Position>{
    if(!id){
      throw new BadRequestException('ข้อมูลไม่ถูกต้อง');
    }
    const position = await this.prismaService.position.findUnique({ where:{id:id} });
    
    if(!position){
      throw new NotFoundException('ไม่พบข้อมูลนี้');
      
    }
    return position;
  }

  async update(id: number, data: Prisma.PositionUpdateInput):Promise<Position> {
    const position = await this.prismaService.position.update({
      where:{id:id},
      data:data
    });
    return position;
  }

  async remove(id: number):Promise<Position> {
    const position = await this.prismaService.position.delete({
      where:{id:id}
    });
    return position;
  }
}
