import { ItemSearchResult } from './../../types';
import { Context, ItemSearchParams } from 'src/types';

export async function getSearch(context: Context, params: ItemSearchParams): Promise<ItemSearchResult> {
  const url: URL = new URL('/rest/storefront/items', context.config.api.url);

  if (!params.term) {
    // @TODO error handling
  }

  url.searchParams.set('query', params.term);

  const { data } = await context.client.get(url.href);

  return { products: data.itemList.documents.map((item) => item.data) };
}
