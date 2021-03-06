import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICampaign, ICheckOutData } from '../campaigns/interfaces';
import {
  ActionName,
  OperatorMessage,
  FilterName,
  Repository,
} from '../contants';
import {
  OperatorsServiceBase,
  TOperatorControl,
} from './operators.service.base';
import { CampaignsRepository } from '../campaigns/campaigns.repository';

@Injectable()
export class OperatorsService extends OperatorsServiceBase {
  private readonly logger = new Logger('OperatorsService');

  constructor(
    @Inject(Repository.Campaign)
    private readonly campaignsRepository: CampaignsRepository,
  ) {
    super();
    this.setOperators([
      // Register action operators
      this.getCampaignByIdAction(),
      // Register filter operators
      this.isCampaignAvailableFilter(),
    ]);
  }

  private getCampaignByIdAction(): TOperatorControl {
    return {
      name: ActionName.GetCampaignById,
      required: [],
      callback: async (data: ICheckOutData, store: unknown) => {
        const { campaignId } = data;
        const [campaign] = await this.campaignsRepository.findAll({
          where: { id: campaignId },
        });
        this.logger.log(`Get campaign id ${campaignId}`);
        this.logger.debug(`Campaign: ${JSON.stringify(campaign, null, 2)}`);
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
      required: [ActionName.GetCampaignById],
      callback: async (data: ICheckOutData, store: { campaign: ICampaign }) => {
        const submitDate = new Date();
        const {
          campaign: { start, end },
        } = store;
        const next =
          submitDate.getTime() >= start.getTime() &&
          submitDate.getTime() <= end.getTime();
        return {
          next,
          codeStatus: next
            ? 200
            : OperatorMessage.campaignUnavailable.statusCode,
          message: next
            ? 'Successful'
            : OperatorMessage.campaignUnavailable.message,
        };
      },
    };
  }
}
