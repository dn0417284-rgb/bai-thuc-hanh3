import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;
}
