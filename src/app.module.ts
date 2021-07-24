import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';

@Module({
  imports: [ProfileModule, DepartmentModule, PositionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
