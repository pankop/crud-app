import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { QueryItemDto } from './dto/query-item';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}
  async getAllItems(queryItemDto: QueryItemDto) {
    const query = await this.itemRepository
      .createQueryBuilder()
      .select('*')
      .where('approved = :approved', { approved: true });

    if (queryItemDto.name) {
      query.andWhere('name LIKE :name', { name: `%${queryItemDto.name}%` });
    }

    if (queryItemDto.category) {
      query.andWhere('category LIKE :category', {
        category: `%${queryItemDto.category}%`,
      });
    } // bagian kiri : harus sama karena case sensitive

    if (queryItemDto.location) {
      query.andWhere('location LIKE :location', {
        location: `%${queryItemDto.location}%`,
      });
    }

    query.getRawMany(); //ini y g muncul data banyak
  }

  create(item: CreateItemDto, user: User) {
    const newItem = this.itemRepository.create(item); // funsgsi create iini mengubah data yg dikirimkan ini supaya siap diolah di db
    newItem.user = user; // ini dari property dari item kita akses property usernya dari nilai current user dari controller
    return this.itemRepository.save(newItem);
  }

  async approvedItem(id: number, approved: boolean) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    item.approved = approved;
    return this.itemRepository.save(item);
  }
}
