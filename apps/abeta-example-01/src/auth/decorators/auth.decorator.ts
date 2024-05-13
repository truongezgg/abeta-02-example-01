import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '@app/jwt-authentication';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthenticationGuard), ApiBearerAuth());
}
