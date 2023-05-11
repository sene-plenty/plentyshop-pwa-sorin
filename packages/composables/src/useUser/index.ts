import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import type { User, UserRegisterParams } from '@vue-storefront/plentymarkets-api';
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

    if (data.user && data.user.guestMail) {
      return null;
    }
    return data.user;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    await context.$plentymarkets.api.logoutUser();
    context.useWishlist.setWishlist({ items: [] });
    context.useCart.setCart({ items: [] });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: useUser.updateUser');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {

    const data = await context.$plentymarkets.api.loginUser(username, password);

    const wishlist = await context.$plentymarkets.api.getWishlist();

    context.useWishlist.setWishlist(wishlist);

    const cart = await context.$plentymarkets.api.getCart();

    context.useCart.setCart(cart);

    return data.events.AfterAccountAuthentication.accountContact || null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, params: UserRegisterParams): Promise<User> => {
    if (!params.password || params.password.length === 0) {
      await context.$plentymarkets.api.loginAsGuest(params.email);

      return null;
    } else {
      const data = await context.$plentymarkets.api.registerUser(params);

      const wishlist = await context.$plentymarkets.api.getWishlist();

      context.useWishlist.setWishlist(wishlist);

      const cart = await context.$plentymarkets.api.getCart();

      context.useCart.setCart(cart);

      return data.data || null;

    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentPassword, newPassword }) => {
    await context.$plentymarkets.api.changePassword(currentPassword, newPassword);
    const data = await context.$plentymarkets.api.getSession(false);

    return data.user;
  }
};

export const useUser = useUserFactory<User, UpdateParams, UserRegisterParams>(params);
