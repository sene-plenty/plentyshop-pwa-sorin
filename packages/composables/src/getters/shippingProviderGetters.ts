import { ShippingMethod, ShippingProvider } from '@vue-storefront/plentymarkets-api';

function getShippingProviders(shippingProvider: ShippingProvider): ShippingMethod[] {
  return shippingProvider?.list ?? [];
}

function getShippingMethodName(shippingMethod: ShippingMethod): string {
  return `${shippingMethod?.parcelServiceName} - ${shippingMethod?.parcelServicePresetName}`;
}

function getShippingAmount(shippingMethod: ShippingMethod): string {
  return shippingMethod?.shippingAmount?.toString() ?? '0';
}

function getValue(shippingMethod: ShippingMethod): any {
  return shippingMethod;
}

export const shippingProviderGetters: any = {
  getShippingMethodName,
  getShippingAmount,
  getShippingProviders,
  getValue
};
