import {IntegrationContext, ApiClientMethods, ProductsSearchParams, AgnosticCategoryTree} from '@vue-storefront/core';
import {AxiosInstance} from 'axios';

export type TODO = unknown;

export type Settings = {
  api: {
    url: string
  }
};

export type ReviewAverage = {
  counts: {
    ratingsCountOf1: string,
    ratingsCountOf2: string,
    ratingsCountOf3: string,
    ratingsCountOf4: string,
    ratingsCountOf5: string,
    ratingsCountTotal: string,
    averageValue: string,
    highestCount: string
  }
};

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
  item: {
    id: number
  },
  sku: string,
  prices: {
    rrp: any,
    default: any
  },
  feedback: ReviewAverage
};

export type Endpoints = TODO;

export type BillingAddress = TODO;

export type TotalVat = {
  vatAmount: number
  vatValue: number
};

export type CartItem = {
  id: number
  quantity: number
  price: number
  itemId: number
  variation: Product
  variationId: number
  basketItemOrderParams: any[]
  inputLength: number
  inputWidth: number
  setComponents: any[]
  itemType: number
};

export type Cart = {
  id: number
  sessionId: string
  orderId: number
  customerId: number
  customerShippingAddressId: number
  currency: string
  referrerId: number
  shippingCountryId: number
  methodOfPaymentId: number
  shippingProviderId: number
  shippingProfileId: number
  itemSum: number
  itemSumNet: number
  basketAmount: number
  basketAmountNet: number
  shippingAmount: number
  shippingAmountNet: number
  paymentAmount: number
  couponCode: string
  couponDiscount: number
  shippingDeleteByCoupon: boolean
  basketRebate: number
  maxFsk: number
  orderTimestamp: string
  createdAt: string
  updatedAt: string
  basketRebateType: string
  customerInvoiceAddressId: number
  itemQuantity: number
  totalVats: TotalVat[]
  subAmount: number
  isExportDelivery: boolean
  shopCountryId: number
  itemWishListIds: number[],
  items: CartItem[]
};

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
  id: number,
  name: string,
  type: string,
  cssClass?: string,
  maxResultCount?: string,
  minHitCount?: string,
  position?: number,
  sort?: string,
  values?: Filter[]
}

export declare type ReviewItem = {
  id: number,
  title: string,
  isVisible: true,
  createdAt: string,
  updatedAt: string,
  authorName: string,
  feedbackComment: {
    commentId: string,
    commentRelationType: string,
    commentRelationTargetId: string,
    comment: {
      id: number,
      message: string,
      isVisible: string,
      createdAt: string,
      updatedAt: string
    }
  },
  feedbackRating: {
    ratingId: string,
    ratingRelationType: string,
    ratingRelationTargetId: string,
    rating: {
      id: string,
      ratingValue: string,
      isVisible: string,
      createdAt: string,
      updatedAt: string
    }
  },
  targetRelation: {
    feedbackId: string,
    feedbackRelationType: string,
    feedbackRelationTargetId: string,
    variationAttributes: [],
    targetRelationLabel: string,
    targetRelationName: [],
    feedbackRelationParentTargetId: number
  },
  sourceRelation: [
    feedbackId: string,
    feedbackRelationType: string,
    feedbackRelationSourceId: string,
    sourceRelationLabel: string,
    sourceRelationTypeLabel: string,
    feedback: {
      id: number,
      title: string,
      isVisible: boolean,
      createdAt: string,
      updatedAt: string,
      authorName: string
    }
  ],
  replies: []
};

export type Review = {
  feedbacks: ReviewItem[],
  itemAttributes: [],
  pagination: {
    page: number,
    lastPage: number,
    isLastPage: true
  }
};

export type Facet = {
  products: Product[],
  tree: AgnosticCategoryTree,
  facets: FilterGroup [],
  pagination: any
};

export type CategoryPage = {
  products: Product[],
  facets: FilterGroup[],
  pagination: any
}

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

export type WishlistItem = Product;

export type Wishlist = { items: WishlistItem[] };

export type ClientInstance = AxiosInstance;

export type ReviewSearchParams = {
  productId: string,
  itemId: number
}

export type ItemSearchParams = {
  term: string
}

export type ItemSearchResult = {
  products: Product[]
}

export interface PlentymarketsApiMethods {
  getProduct(
    params: ProductsSearchParams
  ): Promise<Product[]>,

  getCategory(
    params: any
  ): Promise<Category[]>,

  getFacet(
    params: any
  ): Promise<CategoryPage>,

  getReview(
    params: ReviewSearchParams
  ): Promise<Review>

  getSearch(
    params: ItemSearchParams
  ): Promise<ItemSearchResult>

  getWishlist(): Promise<Wishlist>,

  addWishlistItem(
    productId: number
  ): Promise<boolean>,

  removeWishlistItem(
    productId: number
  ): Promise<boolean>,

  getCart(): Promise<Cart>,

  addCartItem(params: { productId: number, quantity?: number }): Promise<Cart>,

  removeCartItem(params: { currentCart: Cart, product: Product, customQuery: any }): Promise<Cart>,

  updateCartItemQty(params: { currentCart: Cart, product: Product, quantity: number, customQuery: any }): Promise<Cart>
}

export type Context = IntegrationContext<ClientInstance, Settings, ApiClientMethods<PlentymarketsApiMethods>>;
