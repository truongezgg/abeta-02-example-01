import { ApiProperty, PartialType } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'quang@gmail.com' })
  email: string;

  @ApiProperty({ example: '123123' })
  password: string;
}

export class RegisterAuthDto extends PartialType(LoginAuthDto) {}
