import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationDto {
  @ApiProperty({ example: 'Important Notification' })
  title: string;

  @ApiProperty({ example: 'Notification Content' })
  content: string;
}
