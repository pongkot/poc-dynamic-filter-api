import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Repository, Service } from '../contants';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignsController } from './campaigns.controller';
import { OperatorsModule } from '../operators/operators.module';

@Module({
  imports: [OperatorsModule],
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
  exports: [Repository.Campaign],
  controllers: [CampaignsController],
})
export class CampaignsModule {}
