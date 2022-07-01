import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import type { Category, CategoryDetails } from '@vue-storefront/plentymarkets-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category: Category): AgnosticCategoryTree {
  return {
    label: getCategoryDetails(category.details).name,
    slug: getCategoryDetails(category.details).nameUrl,
    items: category.children ? category.children.map(cat => getTree(cat)) : [],
    isCurrent: false
  };
}

function findCategoryBySlug(categories: Category[], slug: string): Category {
  for (const category of categories) {
    if (getCategoryDetails(category.details).nameUrl === slug) {
      return category;
    }
    if (category.children) {
      const foundCategory = findCategoryBySlug(category.children, slug);

      if (foundCategory) {
        return foundCategory;
      }
    }
  }
}

function getCategoryDetails(details:CategoryDetails[]): CategoryDetails {
  // TODO  return correct details for selected language and webstoreId
  return details[0];
}

export const categoryGetters: CategoryGetters<Category> = {
  getTree,
  findCategoryBySlug,
  getCategoryDetails
};
