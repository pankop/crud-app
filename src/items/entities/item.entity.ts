import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  location: string;

  @Column()
  category: string;

  @Column({ default: false }) //ini default valuenya false ketika user menambahkan data)
  approved: boolean;

  @ManyToOne(() => User, (user) => user.items)
  user: User;
}
