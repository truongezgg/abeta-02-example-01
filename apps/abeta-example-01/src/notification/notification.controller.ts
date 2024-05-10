import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Public } from '@app/core/decorators/public.decorator';
import { CreateNotificationDto } from './dtos/createNotification.dto';
import User from '@app/database-type-orm/entities/User';
import { AuthUser } from '../auth/decorators/user.decorator';
import { PagingDto } from "./dtos/paging.dto";

@ApiBearerAuth()
@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('create')
  async create(@Body() createDto: CreateNotificationDto, @AuthUser() { id }) {
    return this.notificationService.create(id, createDto);
  }

  @Post('all')
  findAll(@AuthUser() { id }, @Body() pagingDto: PagingDto) {
    return this.notificationService.findAll(id, pagingDto);
  }

  @ApiBody({ schema: { type: 'object', properties: {} } })
  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() updateData: Partial<User>) {
    return this.notificationService.update(id, updateData);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.notificationService.delete(id);
  }

  @Patch('read-one/:id')
  async readNotification(@Param('id') id: number) {
    return this.notificationService.updateReadStatus(id);
  }

  @Patch('read-all')
  async readAllNotification(@AuthUser() { id }) {
    return this.notificationService.readAllNotification(id);
  }
}
