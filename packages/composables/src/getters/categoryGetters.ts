import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import type { Category } from '@vue-storefront/plentymarkets-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category: Category): AgnosticCategoryTree {
  return {
    label: category.details[0].name,
    slug: category.details[0].nameUrl,
    items: category.children ? category.children.map(cat => getTree(cat)) : [],
    isCurrent: false
  };
}

export const categoryGetters: CategoryGetters<Category> = {
  getTree
};
