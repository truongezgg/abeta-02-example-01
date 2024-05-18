import { ApiProperty } from '@nestjs/swagger';

export class VerifyDto {
  @ApiProperty({ example: 'abc123' })
  otp: string;
}
