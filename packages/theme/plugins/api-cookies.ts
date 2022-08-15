import type {Plugin} from '@nuxt/types';
import {isArray} from 'util';

/**
 * Plugin that passes threw set cookie headers received during ssr process to the client.
 * @param app
 */
const plugin: Plugin = ({ app }) => {
  const isSSR: boolean = process.server;
  if (isSSR) {
    app.$vsf.$plentymarkets.client.interceptors.response.use((response) => {
      if (response.headers) {
        const setCookie = isArray(response.headers['set-cookie']) ? response.headers['set-cookie'][0] : response.headers['set-cookie'];
        console.log('res');
        if (setCookie) {
          app.context.res.setHeader('set-cookie', setCookie);
          app.$vsf.$plentymarkets.config.cookies = setCookie;
          console.log('res cookies: ', app.$vsf.$plentymarkets.config.cookies);
        }
      }
      return response;
    });

    app.$vsf.$plentymarkets.client.interceptors.request.use((request) => {
      let reqCookies = '';
      if (app.$vsf.$plentymarkets.config.cookies || app.$vsf.$plentymarkets.config.axios.cookie) {
        reqCookies = app.$vsf.$plentymarkets.config.cookies ?? app.$vsf.$plentymarkets.config.axios.cookie;
      } else {
        Object.entries(app.$cookies.getAll()).forEach(([key, val]) => {
          reqCookies += `${key}=${val}; `;
        });
      }
      request.headers.cookie = reqCookies;
      return request;
    });
  }
};

export default plugin;
