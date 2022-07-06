import { ProductsSearchParams } from '@vue-storefront/core';
import { Product, Context } from 'src/types';

export async function getProduct(context: Context, params: ProductsSearchParams): Promise<Product[]> {
  // const url = new URL('/rest/io/variations', context.config.api.url);

  // TODO: for test purposes we hardcode the id 1007
  // params.id && url.searchParams.set('variationIds[]', params.id);
  // TODO: remove this condition
  /* params && url.searchParams.set('variationIds[]', '1007');

  const { data } = await context.client.get(url.href);
  return data.data.documents.map(document => document.data); */

  let url: URL;
  if (params.id) {
    url = new URL('/rest/io/variations', context.config.api.url);
    url.searchParams.set('variationIds[]', params.id);
    url.searchParams.set('resultFieldTemplate', 'SingleItem');
  } else if (params.term) {
    url = new URL('/rest/io/item/search', context.config.api.url);
    url.searchParams.set('query', params.term);
  }
  const { data } = await context.client.get(url.href);
  if (params.id) {
    return data.data.documents.map(document => document.data);
  } else {
    return data.data.itemList.documents.map(document => document.data);
  }
}
