import { CategoryPage } from './../../types';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from 'src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getFacet(context: Context, params: any): Promise<CategoryPage> {
  const categoryId = params.categoryId?.toString() || '16';
  const url = new URL('/rest/io/category', context.config.api.url);
  url.searchParams.set('categoryId', categoryId);
  if (params.limit) {
    url.searchParams.set('items', params.limit);
  }
  if (params.sort) {
    url.searchParams.set('sorting', params.sort);
  }
  const { data } = await context.client.get(url.href);
  return {
    products: data.data.itemList.documents.map(document => document.data),
    facets: data.data.facets
  };
}

