/* eslint-disable @typescript-eslint/no-unused-vars */
import { Category, Context } from 'src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getCategory(context: Context, params: any): Promise<Category[]> {
  const url: URL = new URL('/rest/io/categorytree/', context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data.data;
}
