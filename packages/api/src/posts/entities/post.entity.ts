import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ nullable: false })
  title: string;

  @Column({ default: null })
  image: string;

  @Column({ default: null })
  content: string;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  user: User;
}
