import { Logger } from '@nestjs/common';
import { ActionName, FilterName } from '../contants';
import { CampaignsService } from './campaigns.service';
import {
  ICheckOutData,
  IOperatorExecute,
  IRegisterOperatorControl,
} from './interfaces';

export class CampaignsEntity {
  protected readonly logger = new Logger('CampaignsService');

  protected static getOperatorControl(): Map<
    string,
    IRegisterOperatorControl<ActionName | FilterName>
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

  protected static getOperatorByOperatorSet(
    operatorSet: Array<string>,
  ): Array<IRegisterOperatorControl<ActionName | FilterName>> {
    const result = [];
    const operatorControl = CampaignsService.getOperatorControl();
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
    const operators = CampaignsService.getOperatorByOperatorSet(operatorSet);

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
}
