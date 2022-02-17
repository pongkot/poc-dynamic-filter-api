import { Injectable, Logger } from '@nestjs/common';
import { ICampaign } from './interfaces';

@Injectable()
export class CampaignsRepository {
  private readonly logger = new Logger('CampaignsRepository');

  async findAll(query: { where: { id: number } }): Promise<Array<ICampaign>> {
    let {
      where: { id },
    } = query;
    id -= 1;
    if (!(id >= 0 && id <= 2)) {
      throw new Error(`Campaign ${id} does not exist`);
    }
    const campaigns: Array<ICampaign> = [
      {
        id: 1,
        operatorSet: ['getCampaignById', 'isCampaignAvailable'],
        partner: 1,
        start: new Date(),
        end: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        operatorSet: ['getCampaignById', 'isCampaignAvailable'],
        partner: 2,
        start: new Date(),
        end: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        operatorSet: ['getCampaignById', 'isCampaignAvailable'],
        partner: 3,
        start: new Date(),
        end: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    this.logger.log('Find all campaign successful');
    return [campaigns[id]];
  }
}
