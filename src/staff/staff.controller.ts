import { Controller, Get, Query } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {

    constructor(private readonly staffService:StaffService){}

    @Get('paginate') // staff/paginate?page=1&page_size=3
    async findAllWithPaginate(@Query() query: any) {
        const staff = await this.staffService.findAllWithPaginate(query);
        const total = await this.staffService.getTotal();
        return {
            total: total,
            data: staff
        }
    }


    @Get() // /staff
    findAll(){
        return this.staffService.findAll();
    }

    @Get('sql') //  /staff/sql
    findAll2(){
        return this.staffService.findAll2();
    }


}
