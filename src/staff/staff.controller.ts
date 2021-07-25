import { Controller, Get } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {

    constructor(private readonly staffService:StaffService){}

    @Get() // /staff
    findAll(){
        return this.staffService.findAll();
    }

    @Get('sql') //  /staff/sql
    findAll2(){
        return this.staffService.findAll2();
    }


}
