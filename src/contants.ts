export enum ActionName {
  FetchCampaignById = 'fetchCampaignById',
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
}

export enum Service {
  Campaign = 'campaignService',
}
