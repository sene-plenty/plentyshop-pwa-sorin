import { ProductsSearchParams } from '@vue-storefront/core';
import { Product, Context } from 'src/types';

export async function getCategory(context: Context, params: ProductsSearchParams): Promise<Product[]> {

  const url: URL = new URL('/rest/io/category', context.config.api.url);
  params.catId && url.searchParams.set('categoryId', params.catId[0]);
  url.searchParams.set('itemsPerPage', params.limit);
  const { data } = await context.client.get(url.href);
  return data.data.itemList.documents.map(document => document.data);

}
