import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import type { User } from '@vue-storefront/plentymarkets-api';
import { useCart } from 'src/useCart';
import { useWishlist } from 'src/useWishlist';
import type {
  UseUserUpdateParams as UpdateParams,
  UseUserRegisterParams as RegisterParams
} from '../types';

const params: UseUserFactoryParams<User, UpdateParams, RegisterParams> = {
  provide: () => ({
    useCart: useCart(),
    useWishlist: useWishlist()
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    const data = await context.$plentymarkets.api.getSession(true);
    return data.user;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    await context.$plentymarkets.api.logoutUser();
    context.useWishlist.setWishlist({ items: [] });
    // TODO: Clear cart
    // context.useCart.setCart(cart);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: useUser.updateUser');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {

    if (!password || password.length === 0) {
      await context.$plentymarkets.api.loginAsGuest(email);
    } else {
      await context.$plentymarkets.api.registerUser({ email, password, firstName, lastName });
      await context.$plentymarkets.api.loginUser(email, password);
    }
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    try {
      await context.$plentymarkets.api.loginUser(username, password);

      const wishlist = await context.$plentymarkets.api.getWishlist();
      context.useWishlist.setWishlist(wishlist);

      // TODO: Set card
      /* const cart = await context.$spree.api.getCart();
      context.useCart.setCart(cart); */

      return {};
    } catch (e) {
      throw new Error('Invalid username or password');
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: useUser.changePassword');
    return {};
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
