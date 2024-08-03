import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemDto } from './dto/query-item';
import { JwtAuthGuard } from '../guards/auth.guard';
import { ItemDto } from './dto/item.dto';
import { Serialize } from '../interceptors/serialize.interceptors';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { ApproveItemDto } from './dto/approve-item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'List of Items', type: [ItemDto] })
  @ApiResponse({ status: 404, description: 'Item Not Found' })
  getAllItems(@Query() query: QueryItemDto) {
    return this.itemsService.getAllItems(query);
  }
  @Post()
  @UseGuards(JwtAuthGuard) //harus dalam keaddaan autentikasi atau login
  @Serialize(ItemDto) // nanti method create item ini menerapkan serialize dari item dto
  @ApiOperation({ summary: 'Create an item' })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created',
    type: ItemDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  createItem(@Body() body: CreateItemDto, @CurrentUser() user: User) {
    return this.itemsService.create(body, user);
  }

  @Patch('/:id') // ini jadi parameter
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Approve an item' })
  @ApiResponse({
    status: 200,
    description: 'The item has been approved',
    type: ItemDto,
  })
  @ApiResponse({ status: 404, description: 'Item not Found' })
  approveItem(@Param('id') id: string, @Body() body: ApproveItemDto) {
    return this.itemsService.approvedItem(parseInt(id), body.approved); // nah bagian body jg harus kita spesifikan baggian aprroved sesuai dengan dto yang udh kita buat // kita perlu mengubahnya menjadi integer karena data yang kita terima itu berupa string
  }
}
