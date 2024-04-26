import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'first_name' }) // this is the column name in the database
  firstName: string;

  @Column({ name: 'last_name' }) // this is the column name in the database
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  profession: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'text', name: 'profile_url', nullable: true })
  profileUrl: string;

  @Column({ type: 'date', name: 'graduation_date', nullable: true })
  graduationDate: Date;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
