export enum ActionName {
  GetCampaignById = 'getCampaignById',
  FetchPolicyByPolicyNumber = 'fetchPolicyByPolicyNumber',
  GenerateCouponByECodeId = 'generateCouponByECodeId',
}

export enum FilterName {
  IsCampaignAvailable = 'isCampaignAvailable',
  IsUsedToCheckOutByCampaignId = 'isUsedToCheckOutByCampaignId',
  IsUsedToCheckOutThisMonthByCampaignId = 'isUsedToCheckOutThisMonthByCampaignId',
  IsNewPolicy = 'isNewPolicy',
  IsRenewPolicy = 'isRenewPolicy',
  IsPolicyActive = 'isPolicyActive',
  IsPolicyPaidDateInCampaignPeriod = 'isPolicyPaidDateInCampaignPeriod',
}

export enum Repository {
  Campaign = 'campaignRepository',
  Operator = 'operatorRepository',
}

export enum Service {
  Campaign = 'campaignService',
  Operator = 'operatorService',
}

export const OperatorMessage = {
  sendECode: {
    statusCode: 200,
    message: 'ECode sending to mobile',
  },
  checkOutFailed: {
    statusCode: 400,
    message: 'Sorry, Check out ECode failed',
  },
  campaignUnavailable: {
    statusCode: 401,
    message: 'Campaign unavailable',
  },
  eCodeOutOfStock: {
    statusCode: 402,
    message: 'Sorry, ECode are out of stock',
  },
  policyInvalid: {
    statusCode: 403,
    message: 'Sorry, Policy is invalid',
  },
  policyCheckedOut: {
    statusCode: 404,
    message: 'Sorry, Policy is checked out',
  },
};
