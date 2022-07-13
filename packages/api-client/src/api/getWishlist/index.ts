/* eslint-disable @typescript-eslint/no-unused-vars */
import {Context, Wishlist} from '../../types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getWishlist(context: Context, params: any): Promise<Wishlist> {
  const url: URL = new URL('/rest/io/itemWishList/', context.config.api.url);
  const { data } = await context.client.get(url.href);
  return { items: data.data.documents };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function addWishlistItem(context: Context, productId: number): Promise<boolean> {
  const url: URL = new URL('/rest/io/itemWishList', context.config.api.url);
  url.searchParams.set('variationId', String(productId));

  // {"id":null,"contactId":0,"plentyId":34831,"variationId":1005,"quantity":0,"createdAt":"2022-07-12 10:49:02"}
  const { data } = await context.client.get(url.href);
  return Boolean(data.variationId);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function removeWishlistItem(context: Context, productId: number): Promise<boolean> {
  const url: URL = new URL(`/rest/io/itemWishList/${productId}`, context.config.api.url);
  const { data } = await context.client.get(url.href);

  return Boolean(data.data);
}
