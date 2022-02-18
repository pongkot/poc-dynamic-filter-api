import { IRegisterOperatorControl } from '../campaigns/interfaces';
import { ActionName, FilterName } from '../contants';

export type TOperatorControl = IRegisterOperatorControl<
  FilterName | ActionName
>;

export class OperatorsServiceBase {
  private operators: Array<TOperatorControl>;

  setOperators(operators: Array<TOperatorControl>): void {
    this.operators = operators;
  }

  getOperators(): Array<TOperatorControl> {
    return this.operators;
  }
}
