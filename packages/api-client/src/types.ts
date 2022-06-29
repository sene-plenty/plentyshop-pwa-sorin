import { IntegrationContext, ApiClientMethods, ProductsSearchParams } from '@vue-storefront/core';
import { AxiosInstance } from 'axios';

export type TODO = unknown;

export type Settings = {
  api: {
    url: string
  }
};

export type Endpoints = TODO;

export type BillingAddress = TODO;

export type Cart = TODO;

export type CartItem = TODO;

export type CategoryDetails = {
  name: string,
  lang: string,
  nameUrl: string,
  metaTitle: string,
  imagePath: string,
  image2Path: string,
};

export type Category = {
  id: number,
  type: string,
  // TODO: maybe implement correct type
  itemCount: any,
  childCount: number,
  details: CategoryDetails
};

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type Order = TODO;

export type OrderItem = TODO;

export type PasswordResetResult = TODO;

export type Product = {
    texts: {
      name1: string,
      name2: string,
      name3: string,
      description: string,
      shortDescription: string,
      urlPath: string,
      lang: string,
      technicalData: string
    },
    images: {
      all: {
        position: string,
        names: {
          imageId: number,
          name: string,
          alternate: string,
          lang: string
        }
        url: string,
        urlMiddle: string,
        urlPreview: string
      }[],
      variation: {
        position: string,
        names: {
          imageId: number,
          name: string,
          alternate: string,
          lang: string
        }
        url: string,
        urlMiddle: string,
        urlPreview: string
      }[],
    },
    defaultCategories: {
      id: number,
      parentCategoryId: number,
      level: 2
    }[]
  name: string,
  variation: {
    id: number
  },
  sku: string,
  prices: {
    rrp: any,
    default: any
  }
};

export type ProductFilter = TODO;

export type Review = TODO;

export type ReviewItem = TODO;

export type User = TODO;

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingMethod = TODO;

export type ShippingProvider = TODO;

export type Store = TODO;

export type Wishlist = TODO;

export type WishlistItem = TODO;

export type ClientInstance = AxiosInstance;

export interface PlentymarketsApiMethods {
  getProduct(
    params: ProductsSearchParams
  ): Product[]
}

export type Context = IntegrationContext<ClientInstance, Settings, ApiClientMethods<PlentymarketsApiMethods>>;
