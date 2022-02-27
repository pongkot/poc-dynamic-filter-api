import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { Service } from '../contants';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(
    @Inject(Service.Campaign)
    private readonly campaignsService: CampaignsService,
  ) {}

  @Post('/checkout/campaign/:campaignId')
  checkOut(
    @Param('campaignId')
    campaignId: number,
    @Body('mobile')
    mobile: string,
    @Body('policyNumber')
    policyNumber: string,
  ) {
    return this.campaignsService.checkOut({
      campaignId,
      mobile,
      policyNumber,
    });
  }
}
