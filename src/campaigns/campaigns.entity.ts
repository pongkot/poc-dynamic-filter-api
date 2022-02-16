import { Logger } from '@nestjs/common';
import { ActionName, FilterName } from '../contants';
import { CampaignsService } from './campaigns.service';
import { ICheckOutData, IOperatorExecute, TOperator } from './interfaces';

export class CampaignsEntity {
  protected readonly logger = new Logger('CampaignsService');

  protected static getOperatorControl(): Map<
    string,
    {
      name: string;
      required?: Array<string>;
      callback: Promise<TOperator<any>> | TOperator<any>;
    }
  > {
    const operator = new Map();
    const filterActionBucket = [
      ...CampaignsService.registerFilterOperatorControl(),
      ...CampaignsService.registerActionOperatorControl(),
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

  // protected static getOperatorByOperatorSet(operatorSet: Array<string>): Array<{
  //   name: FilterName | ActionName;
  //   required?: string;
  //   callback: Promise<TOperator<any>> | TOperator<any>;
  // }> {
  //   const result = [];
  //   const operatorControl = CampaignsService.getOperatorControl();
  //   for (const operatorName of operatorSet) {
  //     result.push(operatorControl.get(operatorName));
  //   }
  //   return result;
  // }

  // async operatorExecute(
  //   checkOutData: ICheckOutData,
  //   operatorSet: Array<string>,
  // ): Promise<IOperatorExecute> {
  //   let store = {};
  //   let codeStatus = 200;
  //   let message = 'Operator execute complete';
  //   const operators = CampaignsService.getOperatorByOperatorSet(operatorSet);
  //
  //   for (const operator of operators) {
  //     // TODO implement requires stage
  //     const { next, body, emit } = await operator.callback(checkOutData, store);
  //
  //     // TODO implement filter/action fail stage
  //     if (!next) {
  //       codeStatus = body.codeStatus;
  //       message = body.message;
  //       this.logger.log(`Operator ${operator.name} crashing`);
  //       break;
  //     }
  //
  //     // TODO implement store stage
  //     if (emit) {
  //       store = { ...store, ...emit };
  //       this.logger.log(`Operator ${operator.name} emit data`);
  //     }
  //
  //     this.logger.log(`Operator ${operator.name} finish`);
  //   }
  //
  //   return { codeStatus, message };
  // }
}
