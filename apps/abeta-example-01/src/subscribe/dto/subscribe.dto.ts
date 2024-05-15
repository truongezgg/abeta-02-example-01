import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubscribeDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  subscriptionId: string;
}
