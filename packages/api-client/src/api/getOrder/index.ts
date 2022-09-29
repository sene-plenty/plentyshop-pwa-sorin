import { Context } from 'src/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function additionalInformation(context: Context, params: any): Promise<any> {
  const url: URL = new URL('/rest/io/order/additional_information', context.config.api.url);
  const { data } = await context.client.post(url.href, params);
  return data;
}

export async function preparePayment(context: Context): Promise<any> {
  const url: URL = new URL('/rest/io/checkout/payment', context.config.api.url);
  const { data } = await context.client.post(url.href);
  return data.data;
}

export async function placeOrder(context: Context): Promise<any> {
  const url: URL = new URL('/rest/io/order', context.config.api.url);
  const { data } = await context.client.post(url.href);
  return data;
}

export async function executePayment(context: Context, paymentId: number): Promise<any> {
  const url: URL = new URL(`/execute-payment/${paymentId}/`, context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data;
}
