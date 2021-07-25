import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PositionService } from './position.service';
// import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Prisma } from '@prisma/client';
import { response, Response } from 'express';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  // @Post()
  // create(@Body() createPositionDto: CreatePositionDto) {
  //   return this.positionService.create(createPositionDto);
  // }

  @Post()
  async create(@Body() data: Prisma.PositionCreateInput, @Res() response:Response):Promise<Response> {
    const position = await this.positionService.create(data);
    return response.status(200).json(position);
  }

  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  // ตัวอย่าง การใช้ Dto
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
  //   return this.positionService.update(+id, updatePositionDto);
  // }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.PositionUpdateInput) {
    return this.positionService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response:Response):Promise<Response> {
    try {
      await this.positionService.remove(+id);
      return response.status(200).json({message:'ลบข้อมุลเรียบร้อยแล้ว'});
    } catch (error) {
      // console.log(error);
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2025'){ 
        return response.status(400).json({message: 'ไม่พบ ID ในฐานข้อมูล',message_en:error.message});
      }
      return response.status(400).json({message:'เกิดข้อผิดพลาดจาก Server'});
    }
  }
}
