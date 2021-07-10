import { Injectable, NotFoundException, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO, fillterTaskDTO, updateStatusDTO } from '../dto/DTO';
import { Task } from '../entities/task.entities';
import { taskStatus } from '../enum/task.status.enum';
import { TaskRepository } from '../respository/task.repository';
import { v4 as uuid } from 'uuid';
import { getRepository, Like } from 'typeorm';
import { User } from 'src/authentication/entities/user.entites';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    async getAllTask(filter : fillterTaskDTO) : Promise<Task[]>{
        if(!filter.search && !filter.status) return this.taskRepository.find();

        const found = (filter.status == 'OPEN') ? taskStatus.OPEN :  (filter.status== 'DONE') ? taskStatus.DONE : (filter.status == 'IN_PROGRESS') ? taskStatus.IN_PROGRESS : false;

        return this.taskRepository.find({
            where:{
                status : new RegExp(`^${found ? found : ''}`),
                title : new RegExp(`^${filter.search}`),
                description : new RegExp(`^${filter.search}`)
            } 
        })
    }

    async getTaskById(id : string) : Promise<Task>{
        const found = await this.taskRepository.findOne({id});
        if(!found){
            throw new NotFoundException(`Cant find ${id} - Not found !!!`);
        }
        return found;
    }

    async createTask(createTask : CreateTaskDTO, user : User) : Promise<Task>{
        const task  : Task = this.taskRepository.create({
            id: uuid(),
            title : createTask.title,
            description : createTask.description,
            status : taskStatus.OPEN,
            user
        });
        await this.taskRepository.save(task);
        return task;
    }

    async deleteTaskById(id : string) : Promise<Task[]>{
        const found = await this.getTaskById(id);
        this.taskRepository.delete({id});
        return await this.taskRepository.find();
    }

    async updateTaskStatus(id : string, status : string) : Promise<Task>{
        const found = (status == 'OPEN') ? taskStatus.OPEN :  (status== 'DONE') ? taskStatus.DONE : (status == 'IN_PROGRESS') ? taskStatus.IN_PROGRESS : false;
        if(found == false) throw new NotFoundException(`The status ${status} invalid !!!`);
        const task = await this.getTaskById(id);
        task.status = status;
        this.taskRepository.save(task);
        return task;
    }
}
