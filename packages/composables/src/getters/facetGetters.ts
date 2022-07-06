import {
  FacetsGetters,
  FacetSearchResult,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,

  AgnosticFacet
} from '@vue-storefront/core';
import type { Facet, FacetSearchCriteria, Product } from '@vue-storefront/plentymarkets-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAll(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticFacet[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGrouped(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticGroupedFacet[] {
  console.log(params);
  return params.data.facets.map((group) => {
    return {
      id: group.id.toString(),
      label: group.name,
      count: group.count,
      options: group.values.map((filter) => {
        return {
          type: group.type,
          id: filter.id.toString(),
          value: filter.name.toString()
        };
      })
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSortOptions(params: FacetSearchResult<Facet>): AgnosticSort {
  const options = [
    {
      id: 'texts.name1_asc',
      value: 'Name A-Z',
      type: 'sort'
    },
    {
      id: 'texts.name1_desc',
      value: 'Name Z-A',
      type: 'sort'
    },
    {
      id: 'sorting.price.avg_asc',
      value: 'Preis ⬆',
      type: 'sort'
    },
    {
      id: 'sorting.price.avg_desc',
      value: 'Preis ⬇',
      type: 'sort'
    }
  ].map(o => ({ ...o, selected: o.id === params.input.sort }));
  const selected = options.find(o => o.id === params.input.sort)?.id;
  return { selected, options };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryTree(params: FacetSearchResult<Facet>): AgnosticCategoryTree {
  return params.data.tree;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProducts(products: FacetSearchResult<Facet>): Product[] {
  return products.data.products;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPagination(params: FacetSearchResult<Facet>): AgnosticPagination {
  return {
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    itemsPerPage: 10,
    pageOptions: []
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBreadcrumbs(params: FacetSearchResult<Facet>): AgnosticBreadcrumb[] {
  return [];
}

export const facetGetters: FacetsGetters<Facet, FacetSearchCriteria> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};
