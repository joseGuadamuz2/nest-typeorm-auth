import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../common/base.model';

@Entity('users')
export class User extends BaseModel {
  // Declaramos el ID explícitamente en la entidad
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password?: string;
}