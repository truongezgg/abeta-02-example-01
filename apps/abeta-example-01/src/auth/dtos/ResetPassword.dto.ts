import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: '123123' })
  password: string;

  @ApiProperty({ example: 'quang@gmail.com' })
  email: string;
}
