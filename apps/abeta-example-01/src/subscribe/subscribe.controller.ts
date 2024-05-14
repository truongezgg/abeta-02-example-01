import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubscribeService } from './subscribe.service';
import { AuthUser } from '../auth/decorators/user.decorator';
import { SubscribeDto } from './dto/subscribe.dto';

@ApiBearerAuth()
@ApiTags('subscribe')
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  async subscribeUser(@AuthUser() { id }, @Body() subscribeDto: SubscribeDto) {
    const userId = id;

    return await this.subscribeService.saveSubscription(
      userId,
      subscribeDto.subscriptionId,
    );
  }
}
