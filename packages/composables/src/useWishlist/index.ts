/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import type { Wishlist, WishlistItem, Product } from '@vue-storefront/plentymarkets-api';
import {wishlistGetters} from '../getters/wishlistGetters';
import {productGetters} from '../getters/productGetters';

const params: UseWishlistFactoryParams<Wishlist, WishlistItem, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    const data = await context.$plentymarkets.api.getWishlist();
    // console.log('load wishlist', data);
    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentWishlist, product }) => {
    await context.$plentymarkets.api.addWishlistItem(product.variation.id);
    // console.log('add item to wishlist', product, currentWishlist);
    // TODO: get wishlist from composable and return
    return { items: []};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentWishlist, product }) => {
    await context.$plentymarkets.api.removeWishlistItem(product.variation.id);
    // TODO: get wishlist from composable and return
    return { items: []};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: useWishlist.clear');
    // TODO: implement
    return { items: []};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInWishlist: (context: Context, { currentWishlist, product }) => {
    console.log('cw', currentWishlist);
    const matchingItem = currentWishlist?.items.find(wishlistItem => wishlistGetters.getId(wishlistItem) === productGetters.getId(product));
    return Boolean(matchingItem);
  }
};

export const useWishlist = useWishlistFactory<Wishlist, WishlistItem, Product>(params);
