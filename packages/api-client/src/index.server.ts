import {ApiClientExtension, apiClientFactory} from '@vue-storefront/core';
import axios from 'axios';
import type {Endpoints, Settings} from './types';
import {getProduct} from './api/getProduct';
import {getCategory} from './api/getCategory';
import {getFacet} from './api/getFacet';
import {getReview} from './api/getReview';
import {addWishlistItem, getWishlist, removeWishlistItem} from './api/getWishlist';
import {isArray} from 'util';

let cookies: string | string[] = '';

const cookieBlacklist = ['domain', 'secure', 'httponly'];

const filterCookies = (cookies: string): string => {
  cookieBlacklist.forEach((blacklistedCookie) => {
    if (cookies.includes(blacklistedCookie)) {
      const start = cookies.indexOf(blacklistedCookie);
      const end = cookies.indexOf(';', start) + 1;
      cookies = cookies.replace(cookies.slice(start, end), '');
    }
  });
  return cookies;
};

function onCreate(settings: Settings) {
  const client = axios.create({
    baseURL: settings.api.url,
    withCredentials: true
  });

  // Add a response interceptor
  client.interceptors.response.use((response) => {
    cookies = filterCookies(response.headers['set-cookie'][0]);
    return response;
  }, (error) => {
    return Promise.reject(error);
  });

  client.interceptors.request.use((request) => {
    request.headers.cookie = isArray(cookies) ? cookies[0] : cookies;
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
      cookies = req.headers.cookie ?? '';
      return configuration;
    },
    afterCall: ({ response }) => {
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
