import {
  Context,
  useBillingFactory,
  UseBillingParams
} from '@vue-storefront/core';
import { AddressType, BillingAddress } from '@vue-storefront/plentymarkets-api';
import type {
  UseBillingAddParams as AddParams
} from '../types';

const params: UseBillingParams<BillingAddress, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);

    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { params, billingDetails, customQuery }) => {
    return await context.$plentymarkets.api.saveAddress(AddressType.Billing, billingDetails);
  }
};

export const useBilling = useBillingFactory<BillingAddress, AddParams>(params);
