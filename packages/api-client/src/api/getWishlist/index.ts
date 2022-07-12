/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, WishlistItem } from '../../types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getWishlist(context: Context, params: any): Promise<WishlistItem[]> {
  const url: URL = new URL('/rest/io/itemWishList/', context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data.data;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function addWishlistItem(context: Context, params: any): Promise<any> {
  const url: URL = new URL('/rest/io/itemWishList', context.config.api.url);
  url.searchParams.set('variationId', params.id);

  const { data } = await context.client.get(url.href);
  return data.data;
  // {"id":null,"contactId":0,"plentyId":34831,"variationId":1005,"quantity":0,"createdAt":"2022-07-12 10:49:02"}
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function removeWishlistItem(context: Context, params: any): Promise<boolean> {
  const url: URL = new URL(`/rest/io/itemWishList/${params.id}`, context.config.api.url);
  const { data } = await context.client.get(url.href);

  return Boolean(data.data);
}
