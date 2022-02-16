import { ActionName, FilterName } from '../../contants';

export type TOperator<TEmit> = (
  data: ICheckOutData,
  store: any,
) => {
  next: boolean;
  codeStatus?: number;
  message?: string;
  emit?: TEmit;
};

export interface IRegisterOperatorControl<TFilterActionName> {
  name: TFilterActionName;
  required?: Array<ActionName | FilterName>;
  callback: TOperator<any> | Promise<TOperator<any>>;
}

export interface ICheckOutData {
  campaignId: number;
  policyNumber: string;
  mobile?: string;
}

export interface IOperatorExecute {
  codeStatus: number;
  message: string;
}
