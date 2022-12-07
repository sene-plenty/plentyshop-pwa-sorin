import { Context, GetOrdersResponse } from 'src/types';

export async function getOrders(context: Context): Promise<GetOrdersResponse> {
  const url: URL = new URL('/rest/io/order', context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data;
}
