import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';
import {
  AddressData,
  AddressType,
  UserBillingAddress as Address,
  UserBillingAddressItem as AddressItem
} from '@vue-storefront/plentymarkets-api';

const params: UseUserBillingFactoryParams<Address, AddressItem> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, billingDetails: any) => {
    await context.$plentymarkets.api.saveAddress(AddressType.Billing, billingDetails.address);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, billingDetails: any) => {
    await context.$plentymarkets.api.deleteAddress(billingDetails.address.id, AddressType.Billing);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, billingDetails: any) => {
    await context.$plentymarkets.api.saveAddress(AddressType.Billing, billingDetails.address);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context): Promise<AddressData[]> => {
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data?.length > 0 ? data : [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, shippingDetails: any) => {
    await context.$plentymarkets.api.setAddressAsDefault(shippingDetails.address.id, AddressType.Billing);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  }
};

export const useUserBilling = useUserBillingFactory<Address, AddressItem>(params);
