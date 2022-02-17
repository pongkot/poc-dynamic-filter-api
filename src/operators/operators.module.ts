import { forwardRef, Module } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { Service } from '../contants';
import { CampaignsModule } from '../campaigns/campaigns.module';

@Module({
  imports: [forwardRef(() => CampaignsModule)],
  providers: [
    {
      provide: Service.Operator,
      useClass: OperatorsService,
    },
  ],
  exports: [Service.Operator],
})
export class OperatorsModule {}
