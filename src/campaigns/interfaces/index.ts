export type TOperator = {
  next: boolean;
  emit?: any;
  codeStatus?: number;
  message?: string;
};

export interface IRegisterOperatorControl<TFilterActionName> {
  name: TFilterActionName;
  required?: Array<any>;
  callback: (data: ICheckOutData, store: any) => Promise<TOperator> | TOperator;
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
