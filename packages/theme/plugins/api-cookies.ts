import type { Plugin } from '@nuxt/types';
import useCookies from '~/composables/useCookies';

/**
 * Plugin that passes threw set cookie headers received during ssr process to the client.
 * @param app
 */
const plugin: Plugin = ({ app }) => {
  const isSSR: boolean = process.server;
  if (isSSR) {
    app.$vsf.$plentymarkets.client.interceptors.response.use((response) => {
      if (response.headers) {
        // const setCookie = response.headers['set-cookie'];
        const setCookie = useCookies().getCookies();

        if (setCookie) {
          app.context.res.setHeader('set-cookie', setCookie);
        }
      }
      return response;
    });
  }
};

export default plugin;
