import { Context, PaymentMethod } from 'src/types';

export async function getPaymentProviders(context: Context): Promise<{ list: PaymentMethod[], selected: 0}> {
  const url: URL = new URL('/rest/storefront/checkout/payment_provider/', context.config.api.url);
  const { data } = await context.client.get(url.href);

  return { list: data, selected: 0 };
}

export async function setPaymentProvider(context: Context, paymentId: number): Promise<string> {
  const url: URL = new URL('/rest/io/checkout/paymentId/', context.config.api.url);
  const { data } = await context.client.post(url.href, { paymentId: paymentId });
  return data;
}
