import { ApiProperty } from '@nestjs/swagger';

export class UpdateRefreshTokenDto {
  @ApiProperty({ example: 'abc123' })
  refreshToken: string;
}
