import { Exclude } from 'class-transformer';
import { Item } from '../../items/entities/item.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @AfterInsert() // ini namanya hook dijalankan setelah method crete
  logInsert() {
    console.log('Inserted User with id: ' + this.id);
  }

  @AfterUpdate() // ini namanya hook dijalankan setelah method crete
  logUpdate() {
    console.log('Updated User with id: ' + this.id);
  }

  @AfterRemove() // ini namanya hook dijalankan setelah method crete
  logRemove() {
    console.log('Removed User with id: ' + this.id);
  }
}
