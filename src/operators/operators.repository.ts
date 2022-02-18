import { Injectable } from '@nestjs/common';

interface IOperator {
  id: number;
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class OperatorsRepository {
  async findAll(): Promise<Array<IOperator>> {
    return [
      {
        id: 1,
        name: 'getCampaignById',
        type: 'filter',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'isCampaignAvailable',
        type: 'filter',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
