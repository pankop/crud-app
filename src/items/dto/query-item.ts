//import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryItemDto {
  @IsString()
  @IsOptional() // ini fungsinya jika salah satu entity gaada dia ga error atau tidak menampilkan data
  name: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  category: string;

  // @Transform(({ value }) => parseInt(value)) // karena value yang kita dptin itu string maka kita harus ubah ke number dulu
  // @IsNumber()
  // year: number;
}
