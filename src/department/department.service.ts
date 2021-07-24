import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DepartmentService {
    private departments = [
        {id: 1, title: 'ไอที'},
        {id: 2, title: 'บุคคล'}
    ];

    findAll(){
        return this.departments;
    }


    findOne(id:string){
        const department = this.departments.find((item) => item.id === +id);
        if(!department){
            //throw new HttpException('ไม่พบข้อมูลนี้',HttpStatus.NOT_FOUND);
            throw new NotFoundException('ไม่พบข้อมูลนี้');     
        }
        return department;
    }
}
