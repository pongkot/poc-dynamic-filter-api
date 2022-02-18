import { Logger } from '@nestjs/common';
import { ActionName, FilterName } from '../contants';
import {
  ICheckOutData,
  IOperatorExecute,
  IRegisterOperatorControl,
} from './interfaces';

export class CampaignsBase {
  protected readonly logger = new Logger('CampaignsBase');
  private registerOperatorControl: Array<
    IRegisterOperatorControl<FilterName | ActionName>
  >;

  protected getOperatorControl(): Map<
    string,
    IRegisterOperatorControl<ActionName | FilterName>
  > {
    const operator = new Map();
    const operatorControls = this.registerOperatorControl;
    for (const operatorControl of operatorControls) {
      const { name, required, callback } = operatorControl;
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
    const result: Array<IRegisterOperatorControl<ActionName | FilterName>> = [];
    const operatorControl = this.getOperatorControl();
    for (const operatorName of operatorSet) {
      const { name, required, callback } = operatorControl.get(operatorName);
      result.push({
        name,
        required,
        callback,
      });
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
      const currentOperator = operator.name;
      const currentRequired = operator.required;
      const currentOperatorAddress = operatorSet.indexOf(currentOperator);
      const currentRequiredAddressList = currentRequired.map((required) =>
        operatorSet.indexOf(required),
      );
      const result = currentRequiredAddressList
        .map((i: number) => i - currentOperatorAddress)
        .map((i: number) => i <= -1)
        .every((i: boolean) => i);

      if (!result) {
        throw new Error('Required operator invalid');
      }

      const {
        next,
        codeStatus: cs,
        message: m,
        emit,
      } = await operator.callback(checkOutData, store);

      codeStatus = cs;
      message = m;

      if (!next) {
        if (cs) {
          codeStatus = cs;
        }

        if (m) {
          message = m;
        }

        this.logger.error(`Operator ${operator.name} failed`);
        break;
      }

      if (emit) {
        store = { ...store, ...emit };
        this.logger.log(`Operator ${operator.name} emit data`);
      }

      this.logger.log(`Operator ${operator.name} successful`);
    }

    return { codeStatus, message };
  }

  setRegisterOperatorControl(
    operator: Array<IRegisterOperatorControl<FilterName | ActionName>>,
  ): void {
    this.registerOperatorControl = operator;
  }
}
