import { Injectable, Logger } from '@nestjs/common';

export interface ICampaign {
  id: number;
  operatorSet: Array<string>; // TODO should be replace with foreign key
  createdAt: Date;
  updatedAt: Date;
}

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
        operatorSet: ['fetchCampaignById', 'isCampaignAvailable'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        operatorSet: ['fetchCampaignById', 'isCampaignAvailable'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        operatorSet: ['fetchCampaignById', 'isCampaignAvailable'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    this.logger.log('Find all campaign successful');
    return [campaigns[id]];
  }
}
