import {ApiClientExtension, apiClientFactory} from '@vue-storefront/core';
import axios from 'axios';
import type {Settings, Endpoints} from './types';
import {getProduct} from './api/getProduct';
import {getCategory} from './api/getCategory';
import {getFacet} from './api/getFacet';
import {getReview} from './api/getReview';
import {addWishlistItem, getWishlist, removeWishlistItem} from './api/getWishlist';

const PLENTY_ID = 'plentyID';
let sessionId = '';
let cookies = '';

const getSessionIdValue = (cookies: string): string => {
  const keyValue = cookies.split(';').find(cookie => cookie.includes(PLENTY_ID));
  const value = keyValue.split('=')[1];
  return value;
};

function onCreate(settings: Settings) {
  const client = axios.create({
    baseURL: settings.api.url,
    withCredentials: true
  });

  // Add a response interceptor
  client.interceptors.response.use((response) => {
    if (response.headers['set-cookie'] && response.headers['set-cookie'][0].includes(PLENTY_ID)) {
      sessionId = getSessionIdValue(response.headers['set-cookie'][0]);
      cookies = response.headers['set-cookie'][0];
    }
    return response;
  }, (error) => {
    return Promise.reject(error);
  });

  client.interceptors.request.use((request) => {
    request.headers.cookie = cookies;
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
      res.cookie(PLENTY_ID, sessionId);
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
