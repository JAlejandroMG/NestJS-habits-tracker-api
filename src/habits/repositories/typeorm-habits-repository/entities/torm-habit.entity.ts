import { HABITS_STORE } from 'src/utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn /*PrimaryGeneratedColumn*/,
  UpdateDateColumn,
} from 'typeorm';

//* If the name is not passed, it will assign the class name.
@Entity(HABITS_STORE)
export class TOrmHabitEntity {
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  description?: string;

  //* The library will automatically generate id numbers with decorator.
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @UpdateDateColumn()
  updated_at: Date;
}
