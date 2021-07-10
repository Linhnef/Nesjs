import { Module } from '@nestjs/common';
import { TasksController } from './controller/tasks.controller';
import { TasksService } from './service/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './respository/task.repository';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports : [TypeOrmModule.forFeature([TaskRepository]),AuthenticationModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
