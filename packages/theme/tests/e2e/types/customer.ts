import { Address } from '@vue-storefront/plentymarkets-api';

export type Customer = {
  firstName?: string;
  lastName?: string;
  address?: {
    shipping: Address,
    billing: Address
  }
}
