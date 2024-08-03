import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  find(email: string) {
    return this.userRepository.find({
      where: { email },
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  create(name: string, email: string, password: string) {
    const user = this.userRepository.create({ name, email, password }); // ini belum kesimpen ke db, ini harus dilakukan agar hook bisa dijalankan dalam file entitas
    return this.userRepository.save(user); // kita harus ngesave karena kalau kita bau saja tidak akan ke save ke dalam db.
  }

  async findOneBy(id: number) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    // pake asyncronus supaya memastikan datanya ketemu terlebih dahulu
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id }); //dengan attrs atau attribute partial kita bisa jika ingin update satu aja attribute ngga harus semuanya
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs); //ini untuk mengasign atau mengubah data yang ada
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User no found');
    }
    return this.userRepository.remove(user);
  }
}
