import { Inject, Injectable } from '@nestjs/common';
import { ActionName, FilterName, Repository } from '../contants';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignsEntity } from './campaigns.entity';
import {
  ICheckOutData,
  IOperatorExecute,
  IRegisterOperatorControl,
} from './interfaces';

@Injectable()
export class CampaignsService extends CampaignsEntity {
  constructor(
    @Inject(Repository.Campaign)
    private readonly campaignRepository: CampaignsRepository,
  ) {
    super();
  }

  // async checkOut(checkOutData: ICheckOutData): Promise<IOperatorExecute> {
  //   const { campaignId } = checkOutData;
  //   const [{ operatorSet }] = await this.campaignRepository.findAll({
  //     where: { id: campaignId },
  //   });
  //   return this.operatorExecute(checkOutData, operatorSet);
  // }

  static registerFilterOperatorControl(): Array<{
    name: any;
    required?: Array<any>;
    callback: (
      data: ICheckOutData,
      store: any,
    ) => Promise<{ next: boolean; emit?: any }> | { next: boolean; emit?: any };
  }> {
    return [
      {
        name: FilterName.IsCampaignAvailable,
        required: [],
        callback: (
          data: ICheckOutData,
          store: { campaign: { name: string; start: Date; finish: Date } },
        ) => {
          const {
            campaign: { name, start, finish },
          } = store;
          const c = { name, start, finish };
          console.log({ data, c });
          return {
            next: true,
          };
        },
      },
      {
        name: 'A',
        required: [],
        callback: async (data: ICheckOutData, store: any) => {
          console.log({ data, store });
          const getA = new Promise((resolve) => {
            resolve('a');
          });
          const a = await getA;
          return {
            next: true,
            emit: {
              a,
            },
          };
        },
      },
    ];
  }

  // static registerActionOperatorControl(): Array<
  //   IRegisterOperatorControl<ActionName>
  // > {
  //   // TODO implement for easy to use
  //   return [
  //     {
  //       name: ActionName.FetchCampaignById,
  //       required: [],
  //       callback: async (data: ICheckOutData, store: any) => {
  //         console.log({ data, store });
  //         return {
  //           next: true,
  //           emit: {
  //             campaign: {
  //               name: 'discount 10 bath',
  //               start: new Date('2022-01-01'),
  //               end: new Date('2022-02-01'),
  //             },
  //           },
  //         };
  //       },
  //     },
  //   ];
  // }
}
