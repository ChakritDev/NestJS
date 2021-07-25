import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';
import { PrismaModule } from './prisma/prisma.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [ProfileModule, DepartmentModule, PositionModule, PrismaModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
