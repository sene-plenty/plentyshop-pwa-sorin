import { IntegrationContext, ApiClientMethods, ProductsSearchParams, AgnosticCategoryTree } from '@vue-storefront/core';
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
  children: Category[],
  details: CategoryDetails[]
};

export type Coupon = TODO;

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
      technicalData: string,
      shortDescription: string,
      urlPath: string,
      lang: string,
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

export type Filter = {
      id: number,
      name: string,
      cssClass?: string,
      position?: number,
      count?: number,
      selected?: boolean
}

export type FilterGroup = {
  count: number,
  cssClass?: string,
  id: number,
  maxResultCount?: string,
  minHitCount?: string,
  name: string,
  position?: number,
  sort?: string,
  type: string,
  values?: Filter[]
}

export type Facet = {
  products: Product[],
  tree: AgnosticCategoryTree,
  facets: FilterGroup []
};

export type CategoryPage = {
  products: Product[],
  facets: FilterGroup[]
}

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

export type WishlistItem = any;

export type ClientInstance = AxiosInstance;

export interface PlentymarketsApiMethods {
  getProduct(
    params: ProductsSearchParams
  ): Product[],
  getCategory(
    params: any
  ): Category [],
  getFacet(
    params: any
  ): CategoryPage
}

export type Context = IntegrationContext<ClientInstance, Settings, ApiClientMethods<PlentymarketsApiMethods>>;
