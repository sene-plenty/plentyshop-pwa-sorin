import { Context, ProductsSearchParams } from '@vue-storefront/core';
import { Product } from 'src/types';

export async function getProduct(context: Context, params: ProductsSearchParams): Promise<Product> {
  const url = new URL('/rest/io/variations', context.config.api.url);

  // TODO: for test purposes we hardcode the id 1007
  // params.id && url.searchParams.set('variationIds[]', params.id);
  // TODO: remove this condition
  params && url.searchParams.set('variationIds[]', '1007');

  const { data } = await context.client.get(url.href);

  return data.data.documents.map(document => document.data);
}
