import { Inject, Injectable } from '@nestjs/common';
import { Repository } from '../contants';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignsBase } from './campaigns.base';
import { ICheckOutData, IOperatorExecute } from './interfaces';

@Injectable()
export class CampaignsService extends CampaignsBase {
  constructor(
    @Inject(Repository.Campaign)
    private readonly campaignRepository: CampaignsRepository,
  ) {
    super();
  }

  async checkOut(checkOutData: ICheckOutData): Promise<IOperatorExecute> {
    const { campaignId } = checkOutData;
    const [{ operatorSet }] = await this.campaignRepository.findAll({
      where: { id: campaignId },
    });
    return this.operatorExecute(checkOutData, operatorSet);
  }
}
