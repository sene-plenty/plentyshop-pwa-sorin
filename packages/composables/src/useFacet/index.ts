import { categoryGetters } from './../getters/categoryGetters';
import { useCategory } from './../useCategory/index';
import {
  Context,
  useFacetFactory,
  FacetSearchResult,
  AgnosticCategoryTree
} from '@vue-storefront/core';
import type {
  UseFacetSearchParams as SearchParams
} from '../types';
import { Facet } from '@vue-storefront/plentymarkets-api';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<SearchParams>) => {

    // TODO this sometimes causes an error while switching categories or singleItem
    const { categories } = useCategory('categories');

    const category = categoryGetters.findCategoryBySlug(categories.value, params.input.categorySlug);

    const tree: AgnosticCategoryTree = categoryGetters.getTree(category);

    if (category) {
      params.input.categoryId = category.id;
    }
    const data = await context.$plentymarkets.api.getFacet(params.input);
    return {
      products: data.products,
      tree,
      facets: data.facets
    } as Facet;
  }
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
