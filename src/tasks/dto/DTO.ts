import { IsNotEmpty } from 'class-validator'

export class CreateTaskDTO{
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    description : string;
}

export class updateStatusDTO{
    @IsNotEmpty()
    id : string;

    @IsNotEmpty()
    status : string;
}

export class fillterTaskDTO{
    status? : string;

    search? : string;
}

export class updateTaskDTO{
    @IsNotEmpty()
    id : string;
    @IsNotEmpty()
    status : string;
}