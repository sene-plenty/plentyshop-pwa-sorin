/* eslint-disable @typescript-eslint/no-unused-vars */
import {Cart, Context} from '../../types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getCart(context: Context): Promise<Cart> {
  const url: URL = new URL('/rest/io/session/', context.config.api.url);
  const { data } = await context.client.get(url.href);
  const cart = { ...data.data.basket, items: data.data.basketItems };
  return cart;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function addItem(context: Context, params: { productId: number, quantity?: number }): Promise<boolean> {
  const url: URL = new URL('/rest/io/basket/items/', context.config.api.url);
  // variationId=1007&quantity=1&totalOrderParamsMarkup=0&template=Ceres%3A%3ABasket.Basket&templateType=category
  const { data } = await context.client.post(url.href, { variationId: params.productId, quantity: params.quantity ?? 1 });
  return Boolean(data.data);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function removeItem(context: Context, cartItemId: number): Promise<boolean> {
  const url: URL = new URL(`/rest/io/basket/items/${cartItemId}/`, context.config.api.url);
  const { data } = await context.client.delete(url.href);
  return Boolean(data.data);
}

export async function updateItemQty(context: Context, params: { productId: number, cartItemId: number, quantity: number }): Promise<boolean> {
  const url: URL = new URL(`/rest/io/basket/items/${params.cartItemId}`, context.config.api.url);
  const { data } = await context.client.put(url.href);
  return Boolean(data.data);
}
