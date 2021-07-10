import { ObjectId } from "mongodb";
import { Task } from "src/tasks/entities/task.entities";
import { Column, Entity, PrimaryGeneratedColumn,ObjectIdColumn,OneToMany,JoinColumn } from "typeorm";

@Entity()
export class User{
    JoinColumn
    @ObjectIdColumn()
    _id: ObjectId;

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({unique : true})
    username : string;

    @Column()
    password : string;
    
    @OneToMany(_type => Task, task => task.user, { cascade: true, eager: true})
    @JoinColumn()
    tasks : Task;
}