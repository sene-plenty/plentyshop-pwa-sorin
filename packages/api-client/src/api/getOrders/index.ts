import { UseUserOrderSearchParams } from '@vue-storefront/core';
import { Context, GetOrdersResponse } from 'src/types';

export async function getOrders(context: Context, params: UseUserOrderSearchParams): Promise<GetOrdersResponse> {
  const url: URL = new URL('/rest/storefront/orders', context.config.api.url);

  url.searchParams.set('page', params?.page?.toString() ?? '1');
  url.searchParams.set('items', '5');

  const { data } = await context.client.get(url.href);

  const shippingCostTypeId = 6;

  data.data.entries.map(entry => {
    entry.order.orderItems = entry.order.orderItems.filter(item => item.typeId !== shippingCostTypeId);
  });

  return data;
}
