import { Expose, Transform } from 'class-transformer';

export class ItemDto {
  @Expose() // ini untuk data mana yang mau kita tampilkan atau kita expose
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  location: string;

  @Expose()
  category: string;

  @Transform(({ obj }) => obj.user.id) //ini tuh data secara kesuluruhan yakni userId yg memiliki sebuah item. dan id sebagai penanda aja atau unique key
  @Expose()
  userdId: number;
}
