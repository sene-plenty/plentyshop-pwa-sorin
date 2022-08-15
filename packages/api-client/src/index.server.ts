import {ApiClientExtension, apiClientFactory} from '@vue-storefront/core';
import axios from 'axios';
import type {Endpoints, Settings} from './types';
import {getProduct} from './api/getProduct';
import {getCategory} from './api/getCategory';
import {getFacet} from './api/getFacet';
import {getReview} from './api/getReview';
import {addWishlistItem, getWishlist, removeWishlistItem} from './api/getWishlist';
import {isArray} from 'util';

const PLENTY_ID = 'plentyID';
let cookies: string | string[] = '';

const getSessionIdCookie = (cookies: string): string => {
  if (cookies.includes(PLENTY_ID)) {
    const start = cookies.indexOf(PLENTY_ID);
    const end = cookies.indexOf(';', start);
    return cookies.substring(start, end);
  }
  return '';
};

function onCreate(settings: Settings) {
  const client = axios.create({
    baseURL: settings.api.url,
    withCredentials: true
  });

  // Add a response interceptor
  client.interceptors.response.use((response) => {
    // sessionId = getSessionIdValue(response.headers['set-cookie'][0]);
    cookies = getSessionIdCookie(response.headers['set-cookie'][0]);
    console.log('response intercept', cookies);
    return response;
  }, (error) => {
    return Promise.reject(error);
  });

  client.interceptors.request.use((request) => {
    request.headers.cookie = isArray(cookies) ? cookies[0] : cookies;
    console.log('request intercept');
    return request;
  }, (error) => {
    return Promise.reject(error);
  });

  return {
    config: settings,
    client
  };
}

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => ({
    beforeCreate: ({configuration}) => {
      // res.cookie(PLENTY_ID, sessionId);
      cookies = req.headers.cookie ?? '';
      console.log('beforeCreate');
      return {
        ...configuration,
        state: {
          getCookies: () => cookies,
          getSessionId: () => req.cookies[PLENTY_ID],
          setSessionId: (token) => {
            if (!token) {
              delete req.cookies[PLENTY_ID];
              return;
            }
            res.cookie(PLENTY_ID, JSON.stringify(token));
          }
        }
      };
    },
    afterCall: ({ response }) => {
      console.log('afterCall');
      res.set('set-cookie', cookies);
      cookies = '';
      return response;
    }
  })
};

const {createApiClient} = apiClientFactory<Settings, Endpoints>({
  onCreate,
  api: {
    getProduct,
    getCategory,
    getFacet,
    getReview,
    getWishlist,
    addWishlistItem,
    removeWishlistItem
  },
  extensions: [tokenExtension]
});

export {
  createApiClient
};
