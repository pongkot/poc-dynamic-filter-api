import { Injectable, Logger } from '@nestjs/common';
import { ICampaign, ICheckOutData } from '../campaigns/interfaces';
import { ActionName, FilterName } from '../contants';
import { OperatorsBase, TOperatorControl } from './operators.base';

@Injectable()
export class OperatorsService extends OperatorsBase {
  private readonly logger = new Logger('OperatorsService');

  constructor() {
    super();
    this.setOperators([
      ...[this.getCampaignByIdAction()],
      ...[this.isCampaignAvailableFilter()],
    ]);
  }

  private getCampaignByIdAction(): TOperatorControl {
    return {
      name: ActionName.getCampaignById,
      required: [],
      callback: async (data: ICheckOutData, store: unknown) => {
        const { campaignId } = data;
        // const [campaign] = await this.campaignRepository.findAll({
        //   where: { id: campaignId },
        // });
        const campaign = {};
        this.logger.log(`Get campaign id ${campaignId}`);
        this.logger.debug(`${{ campaign }}`);
        return {
          next: true,
          emit: {
            campaign,
          },
        };
      },
    };
  }

  private isCampaignAvailableFilter(): TOperatorControl {
    return {
      name: FilterName.IsCampaignAvailable,
      required: [],
      callback: async (data: ICheckOutData, store: { campaign: ICampaign }) => {
        const submitDate = new Date();
        const {
          campaign: { start, end },
        } = store;
        return {
          next:
            submitDate.getTime() >= start.getTime() &&
            submitDate.getTime() <= end.getTime(),
          codeStatus: 200,
          message: 'Successful',
        };
      },
    };
  }
}
