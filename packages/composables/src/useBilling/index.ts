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
    console.log('Mocked: useBilling.load');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { params, billingDetails, customQuery }) => {
    await context.$plentymarkets.api.saveAddress(AddressType.Billing, billingDetails);
    return {};
  }
};

export const useBilling = useBillingFactory<BillingAddress, AddParams>(params);
