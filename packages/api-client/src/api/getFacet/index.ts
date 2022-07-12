import { CategoryPage } from './../../types';
import { Context } from 'src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getFacet(context: Context, params: any): Promise<CategoryPage> {
  const categoryId = params.categoryId?.toString() || '16';
  const url = new URL('/rest/io/category', context.config.api.url);
  url.searchParams.set('categoryId', categoryId);

  if (params.page) {
    url.searchParams.set('page', params.page);
  }
  if (params.itemsPerPage) {
    url.searchParams.set('items', params.itemsPerPage);
  }
  if (params.sort) {
    url.searchParams.set('sorting', params.sort);
  }
  if (params.facets) {
    url.searchParams.set('facets', params.facets);
  }
  const { data } = await context.client.get(url.href);

  return {
    products: data.data.itemList.documents.map(document => document.data),
    pagination: {
      totals: data.data.itemList.total
    },
    facets: data.data.facets
  };
}

