import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestMakeFriendDto {
  @ApiProperty({ example: 1 })
  senderId: number;

  @ApiProperty({ example: 1 })
  receiverId: number;

  @ApiProperty({ example: 1 })
  status: boolean;
}
