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
<<<<<<< HEAD
import { User } from '@app/jwt-authentication/user.decorator';
import { LiteralObject } from '@nestjs/common/cache';
=======

>>>>>>> 8119461c90b8962e511e518bb59c7a8d8b3c3cc2
import { AuthUser } from '../auth/decorators/user.decorator';
import { Public } from '@app/jwt-authentication/jwt-authentication.decorator';
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
    }
    return this.requestMakeFriendService.create(creater);
  }
  // @Public()
  @Get('/listidfriends')
  findAll(
    @AuthUser() user: { id },
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    return this.requestMakeFriendService.findAll(page, pageSize, user.id);
  }

  // danh sasch loi moi ket ban cua 1 ng
  // @Public()
  @Get('/listmakefriends')
  findAllMake(
    @AuthUser() user: { id },
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    return this.requestMakeFriendService.findAllMake(page, pageSize, user.id);
  }

  // danh sasch loi moi ket ban  da gui di cua 1 ng
  // @Public()
  @Get('/listmadefriends')
  findAllMade(
    @AuthUser() user: { id },
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    return this.requestMakeFriendService.findAllMade(page, pageSize, user.id);
  }

  // danh sasch loi moi ket ban  da gui di cua 1 ng
  @Get('/listfriends')
  findAllFriends(
    @AuthUser() user: { id },
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    return this.requestMakeFriendService.findAllFriends(
      page,
      pageSize,
      user.id,
    );
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.requestMakeFriendService.findOne(+id);
  // }

  /// api xoa
  // @Public()
  @Patch('/delete/:id')
  updateDelete(
    @AuthUser() user: { id },
    @Param('id') id: string,
    @Body() updateRequestMakeFriendDto: UpdateRequestMakeFriendDto,
  ) {
    const deletedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    return this.requestMakeFriendService.updateSender(+id, user.id, {
      status: updateRequestMakeFriendDto.status,
      deletedAt,
      updatedAt,
    });
  }

  /// api nguoi nhan xoa
  // @Public()
  @Patch('/receiverDelete/:id')
  updateReceiverDelete(
    @AuthUser() user: { id },
    @Param('id') id: string,
    @Body() updateRequestMakeFriendDto: UpdateRequestMakeFriendDto,
  ) {
    const deletedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    return this.requestMakeFriendService.updateSender(+id, user.id, {
      status: updateRequestMakeFriendDto.status,
      deletedAt,
      updatedAt,
    });
  }

  /// api nguoi nhan chap nhan
  // @Public()
  @Patch('/accept/:id')
  updateReceiverAccept(
    @AuthUser() user: { id },
    @Param('id') id: string,
    @Body() updateRequestMakeFriendDto: UpdateRequestMakeFriendDto,
  ) {
    const updatedAt = new Date().toISOString();
    return this.requestMakeFriendService.updateSender(+id, user.id, {
      status: updateRequestMakeFriendDto.status,
      deletedAt: '',
      updatedAt,
    });
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.requestMakeFriendService.remove(+id);
  // }
}

