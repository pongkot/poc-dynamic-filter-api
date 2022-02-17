import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignsModule } from './campaigns/campaigns.module';
import { OperatorsModule } from './operators/operators.module';

@Module({
  imports: [OperatorsModule, CampaignsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
