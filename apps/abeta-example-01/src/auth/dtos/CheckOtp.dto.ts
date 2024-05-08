import { ApiProperty } from '@nestjs/swagger';

export class CheckOtpDto {
  @ApiProperty({ example: 'abc123' })
  otp: string;
}
