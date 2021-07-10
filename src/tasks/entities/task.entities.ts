import { Exclude } from 'class-transformer';
import { User } from 'src/authentication/entities/user.entites';
import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn,PrimaryGeneratedColumn,JoinColumn } from 'typeorm';

@Entity()
export class Task {
    @ObjectIdColumn()
    _id: ObjectID;

    @PrimaryGeneratedColumn()
    id : string

    @Column()
    description: string;

    @Column()
    title: string;

    @Column()
    status: string;

    @ManyToOne(_type => User, (user) => user.tasks, {eager : false})
    @Exclude({toPlainOnly: true})
    user : User;
}