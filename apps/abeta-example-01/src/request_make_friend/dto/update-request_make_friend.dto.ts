import { PartialType } from '@nestjs/swagger';
import { CreateRequestMakeFriendDto } from './create-request_make_friend.dto';

export class UpdateRequestMakeFriendDto extends PartialType(
  CreateRequestMakeFriendDto,
) {
  receiverId?: number;
  senderId?: number;
  status?: number;
  deletedAt?: string;
  updatedAt?: string;
}
