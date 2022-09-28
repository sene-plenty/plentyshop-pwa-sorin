import { PaymentMethod } from '@vue-storefront/plentymarkets-api';

function getId(paymentMethod: PaymentMethod): string {
  return paymentMethod?.id.toString() ?? '0';
}

function getName(paymentMethod: PaymentMethod): string {
  return paymentMethod?.name ?? '';
}

function getIcon(paymentMethod: PaymentMethod): string {
  return paymentMethod?.icon ?? null;
}

export const paymentProviderGetters = {
  getId,
  getName,
  getIcon
};
