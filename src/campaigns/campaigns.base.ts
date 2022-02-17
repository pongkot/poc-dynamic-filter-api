import { Logger } from '@nestjs/common';
import { ActionName, FilterName } from '../contants';
import {
  ICheckOutData,
  IOperatorExecute,
  IRegisterOperatorControl,
} from './interfaces';

export class CampaignsBase {
  protected readonly logger = new Logger('CampaignsBase');

  protected getOperatorControl(): Map<
    string,
    IRegisterOperatorControl<ActionName | FilterName>
  > {
    const operator = new Map();
    const filterActionBucket = [
      ...this.registerFilterOperatorControl(),
      ...this.registerActionOperatorControl(),
    ];
    for (const filterActionItem of filterActionBucket) {
      const { name, required, callback } = filterActionItem;
      operator.set(name, {
        name,
        required,
        callback,
      });
    }
    return operator;
  }

  protected getOperatorByOperatorSet(
    operatorSet: Array<string>,
  ): Array<IRegisterOperatorControl<ActionName | FilterName>> {
    const result = [];
    const operatorControl = this.getOperatorControl();
    for (const operatorName of operatorSet) {
      result.push(operatorControl.get(operatorName));
    }
    return result;
  }

  async operatorExecute(
    checkOutData: ICheckOutData,
    operatorSet: Array<string>,
  ): Promise<IOperatorExecute> {
    let store = {};
    let codeStatus = 200;
    let message = 'Operator execute complete';
    const operators = this.getOperatorByOperatorSet(operatorSet);

    for (const operator of operators) {
      // TODO implement requires stage
      const {
        next,
        codeStatus: cs,
        message: m,
        emit,
      } = await operator.callback(checkOutData, store);

      if (!next) {
        if (cs) {
          codeStatus = cs;
        }

        if (m) {
          message = m;
        }

        this.logger.log(`Operator ${operator.name} crashing`);
        break;
      }

      if (emit) {
        store = { ...store, ...emit };
        this.logger.log(`Operator ${operator.name} emit data`);
      }

      this.logger.log(`Operator ${operator.name} finish`);
    }

    return { codeStatus, message };
  }

  protected registerFilterOperatorControl(): Array<
    IRegisterOperatorControl<FilterName>
  > {
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
        name: FilterName.IsCampaignAvailable,
        required: [],
        callback: async (data: ICheckOutData, store: any) => {
          console.log({ data, store });
          const getA = new Promise((resolve) => {
            resolve('a');
          });
          const a = await getA;
          return {
            next: true,
            codeStatus: 200,
            message: 'Successful',
            emit: {
              a,
            },
          };
        },
      },
    ];
  }

  protected registerActionOperatorControl(): Array<
    IRegisterOperatorControl<ActionName>
  > {
    // TODO implement for easy to use
    return [
      {
        name: ActionName.FetchCampaignById,
        required: [],
        callback: async (data: ICheckOutData, store: any) => {
          const { campaignId } = data;
          console.log({ data, store });
          return {
            next: true,
            emit: {
              campaignId,
            },
          };
        },
      },
    ];
  }
}
