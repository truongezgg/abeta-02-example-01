import { ApiProperty } from '@nestjs/swagger';

export class OnesignalDto {
  @ApiProperty({ example: 'aaaa' })
  title: string;

  @ApiProperty({ example: 'aaaa' })
  content: string;

  @ApiProperty({ example: 'aaaa' })
  name: string;
}
