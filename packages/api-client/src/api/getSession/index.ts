import { SessionResult } from './../../types';
import { Context } from 'src/types';

export async function getSession(context: Context, initialRestCall: boolean): Promise<SessionResult> {
  const url: URL = new URL('/rest/io/session/', context.config.api.url);
  if (initialRestCall) {
    url.searchParams.set('initialRestCall', initialRestCall.toString());
  }
  const { data } = await context.client.get(url.href);

  return {
    user: data.data.customer,
    basket: data.data.basket
  };
}
