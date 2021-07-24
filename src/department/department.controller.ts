import { Controller, Get, Param, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { DepartmentService } from './department.service';

@Controller('department') //http://localhost:3000/v1/api/department
export class DepartmentController {


    constructor(private readonly departmentService:DepartmentService){}
    // http://localhost:3000/v1/api/department/
    // @Get()
    // findAll() {
    //     let department = [
    //         {id: 1, title: 'ไอที'},
    //         {id: 2, title: 'บุคคล'}
    //     ];
    //     return department;
    // }
    // @Get('all') // http://localhost:3000/v1/api/department/all
    // @Get()
    // findAll(@Res() response: Response): Response {
    //     let department = [
    //         {id: 1, title: 'ไอที'},
    //         {id: 2, title: 'บุคคล'}
    //     ];
    //     return response.status(200).json(department);
    // }
    @Get()
    findAll(@Res() response: Response): Response {
        const departments =this.departmentService.findAll();
        return response.status(200).json(departments);
    }
    

    //http://localhost:3000/v1/api/department/11
    // @Get(':id')
    // findOne(@Param('id') id: string): string {
    //     return 'id ' + id;    
    // }
    @Get(':id')
    findOne(@Param('id') id: string,@Res() response:Response){
        const department = this.departmentService.findOne(id);  
        return response.status(200).json(department); 
    }
    

}
