import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { RequestMakeFriendService } from './request_make_friend.service';
import { CreateRequestMakeFriendDto } from './dto/create-request_make_friend.dto';
import { UpdateRequestMakeFriendDto } from './dto/update-request_make_friend.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '@app/jwt-authentication/user.decorator';
import { LiteralObject } from '@nestjs/common/cache';
import { AuthUser } from '../auth/decorators/user.decorator';
class BodyObj {
  receiverId: number;
  status: boolean;
}
@ApiBearerAuth()
@ApiTags('Friends')
@Controller('request-make-friend')
export class RequestMakeFriendController {
  constructor(
    private readonly requestMakeFriendService: RequestMakeFriendService,
  ) {}

  @Post()
  create(
    @Body() createRequestMakeFriendDto: CreateRequestMakeFriendDto,
    @AuthUser() { id },
  ) {
    const creater = {
      senderId: id,
      receiverId: createRequestMakeFriendDto.receiverId,
      status: createRequestMakeFriendDto.status,
    };
    return this.requestMakeFriendService.create(creater);
  }

  @Get()
  findAll(
    @AuthUser() user: LiteralObject,
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    return this.requestMakeFriendService.findAll(page, pageSize, user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.requestMakeFriendService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestMakeFriendDto: UpdateRequestMakeFriendDto,
  ) {
    return this.requestMakeFriendService.update(
      +id,
      updateRequestMakeFriendDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestMakeFriendService.remove(+id);
  }
}
