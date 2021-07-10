import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/authentication/decorator/Get-User.decorator';
import { User } from 'src/authentication/entities/user.entites';
import { CreateTaskDTO, fillterTaskDTO, updateStatusDTO } from '../dto/DTO';
import { Task } from '../entities/task.entities';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
/* @UseGuards(AuthGuard('jwt')) */
export class TasksController {
    

    constructor( private readonly tasksService : TasksService){}

    @Get('/:id')
    getTaskById(@Param('id') id : string) : Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
        @Body() createTask : CreateTaskDTO,
        @getUser() user : User
        ){
        const { title,description } = createTask;
        return this.tasksService.createTask({
            title : title,
            description : description
        },user);
    }
    
    @Delete('/:id')
    deleteTask(@Param('id') id : string) : Promise<Task[]>{
        return this.tasksService.deleteTaskById(id);
    }

    @Patch()
    updateTask(@Body() updateTask : updateStatusDTO) : Promise<Task>{
        return this.tasksService.updateTaskStatus(updateTask.id,updateTask.status.toUpperCase());
    }

    @Get()
    getAllTask(@Query() filter : fillterTaskDTO) : Promise<Task[]>{
        return this.tasksService.getAllTask(filter);
    }

/*     @Get()
    getFilterTask(@Query() filter : fillterTaskDTO) : Promise<Task[]>{
            return this.tasksService.getFilterTask(filter);
    } */

   /*  //http://localhost:3000/tasks
    @Get()
    getAllTask(@Query() filter : fillterTaskDTO) :Task[]{
        if(Object.keys(filter).length) return this.tasksService.getTaskFilter(filter);
        return this.tasksService.getTasks();
    }

    //http://localhost:3000/tasks/:id
    @Get('/:id')
    getTaskById(@Param('id') id : string) : Task{
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id : string) : Task[]{
       return this.tasksService.deleteTaskById(id);
    }   

    @Patch()
    updateStatus(@Body() updateTask : updateStatusDTO ){
        return this.tasksService.updateStatus(updateTask);
        
    }

    //http://localhost:3000/tasks
    @Post()
    createTask(
        /* @Body('title') title : string,
        @Body('description') description : string, 
        @Body() createTask : CreateTaskDTO
        ) : Task{
        return this.tasksService.createTask(createTask);
    } */
}
