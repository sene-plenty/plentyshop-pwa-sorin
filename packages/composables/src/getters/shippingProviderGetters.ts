import { ShippingMethod, ShippingProvider } from '@vue-storefront/plentymarkets-api';

function getShippingProviders(shippingProvider: ShippingProvider): ShippingMethod[] {
  return shippingProvider.list ?? [];
}

function getShippingMethodName(shippingMethod: ShippingMethod): string {
  return `${shippingMethod.parcelServiceName} - ${shippingMethod.parcelServicePresetName}`;
}

function getShippingAmount(shippingMethod: ShippingMethod): number {
  return shippingMethod.shippingAmount ?? 0;
}

function getValue(shippingMethod: ShippingMethod): string {
  return shippingMethod?.parcelServicePresetId?.toString() ?? '';
}

// export const reviewGetters: ReviewGetters<Review, ReviewItem> = {
//   getItems,
//   getReviewId,
//   getReviewAuthor,
//   getReviewMessage,
//   getReviewRating,
//   getReviewDate,
//   getTotalReviews,
//   getAverageRating,
//   getRatesCount,
//   getReviewsPage
// };

export const shippingProviderGetters: any = {
  getShippingMethodName,
  getShippingAmount,
  getShippingProviders,
  getValue
};
