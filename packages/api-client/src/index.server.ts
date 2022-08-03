import { apiClientFactory } from '@vue-storefront/core';
import axios from 'axios';
import type { Settings, Endpoints } from './types';
import { getProduct } from './api/getProduct';
import { getCategory } from './api/getCategory';
import { getFacet } from './api/getFacet';
import { getReview } from './api/getReview';
import { addWishlistItem, getWishlist, removeWishlistItem } from './api/getWishlist';

const PLENTY_ID = 'plentyID';
let plentyIdCookie = '';

function onCreate(settings: Settings) {
  const client = axios.create({
    baseURL: settings.api.url,
    withCredentials: true
  });

  // Add a response interceptor
  client.interceptors.response.use((response) => {
    if (response.headers['set-cookie'] && response.headers['set-cookie'][0].includes(PLENTY_ID)) {

      plentyIdCookie = response.headers['set-cookie'][0].split(';').find(cookie => cookie.includes(PLENTY_ID));
      console.log('plentyIdCookie res: ', plentyIdCookie);
    }
    return response;
  }, (error) => {
    return Promise.reject(error);
  });

  client.interceptors.request.use((request) => {
    console.log('plentyIdCookie req: ', plentyIdCookie);
    request.headers.cookie = plentyIdCookie;
    return request;
  }, (error) => {
    return Promise.reject(error);
  });

  return {
    config: settings,
    client
  };
}

const { createApiClient } = apiClientFactory<Settings, Endpoints>({
  onCreate,
  api: {
    getProduct,
    getCategory,
    getFacet,
    getReview,
    getWishlist,
    addWishlistItem,
    removeWishlistItem
  }
});

export {
  createApiClient
};
