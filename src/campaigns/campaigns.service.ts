import { Inject, Injectable } from '@nestjs/common';
import { Repository, Service } from '../contants';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignsServiceBase } from './campaigns.service.base';
import { ICheckOutData, IOperatorExecute } from './interfaces';
import { OperatorsService } from '../operators/operators.service';

@Injectable()
export class CampaignsService extends CampaignsServiceBase {
  constructor(
    @Inject(Repository.Campaign)
    private readonly campaignsRepository: CampaignsRepository,
    @Inject(Service.Operator)
    private readonly operatorsService: OperatorsService,
  ) {
    super();
    const operators = this.operatorsService.getOperators();
    this.setRegisterOperatorControl(operators);
  }

  async checkOut(checkOutData: ICheckOutData): Promise<IOperatorExecute> {
    const { campaignId } = checkOutData;
    const [{ operatorSet }] = await this.campaignsRepository.findAll({
      where: { id: campaignId },
    });
    return this.operatorExecute(checkOutData, operatorSet);
  }
}
