import { EntityRepository, Repository } from "typeorm";
import { fillterTaskDTO } from "../dto/DTO";
import { Task } from "../entities/task.entities";
import { taskStatus } from "../enum/task.status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    
}