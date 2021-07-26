import { Injectable } from '@nestjs/common';
import { Staff } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffService {

    constructor(private readonly prismaService:PrismaService) {}

    async findAllWithPaginate(query: any): Promise<Staff[]> {
        const { page, page_size } = query;
        const myPage = page ? Number(page) : 1;
        const myPageSize = page_size ? Number(page_size) : 3;
    
        const staff = await this.prismaService.staff.findMany({
          skip: (myPage - 1) * myPageSize,
          take: myPageSize,  
          include: { Position: true },
          orderBy: { id: 'desc' },
        });
        return staff;
      }
    

    async getTotal():Promise<number> {
        return await this.prismaService.staff.count();
    }

    async findAll():Promise<Staff[]>{
        const staff = await this.prismaService.staff.findMany({
            include:{Position:true},
            orderBy:{id:'desc'}
        });
        return staff;
    }

    // ตัวอย่างการ join เลือกเฉพาะ ฟิว
    async findAll3(): Promise<any> {
        const staff = await this.prismaService.staff.findMany({
            select: {
                id: true,
                fullname: true,
                Position: {
                  select: {
                    title: true,
                  },
                },
              },
        });
        return staff;
    }

    // ตัวอย่างเขียนแบบ Query ปกติ
    async findAll2():Promise<Staff[]>{
        const staff = await this.prismaService.$queryRaw('select * from "Staff" order by id desc');
        return staff;
    }

}
