import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entities';
import { AuthenticationModule } from './authentication/authentication.module';
import { User } from './authentication/entities/user.entites';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'Nestjs',
      entities: [Task,User],
      synchronize: true,
      useUnifiedTopology: true
    }),
    AuthenticationModule,
  ]
})
export class AppModule {}
