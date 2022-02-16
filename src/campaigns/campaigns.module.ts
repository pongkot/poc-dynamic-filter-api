import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Repository, Service } from '../contants';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignsController } from './campaigns.controller';

@Module({
  providers: [
    {
      provide: Service.Campaign,
      useClass: CampaignsService,
    },
    {
      provide: Repository.Campaign,
      useClass: CampaignsRepository,
    },
  ],
  controllers: [CampaignsController],
})
export class CampaignsModule {}
