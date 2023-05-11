import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import type { CategoryTreeItemDetails, CategoryTreeItem } from '@vue-storefront/plentymarkets-api';

function getTree(category: CategoryTreeItem): AgnosticCategoryTree {

  const details = getCategoryDetails(category.details);

  return {
    label: details?.name || '',
    slug: details?.nameUrl || '',
    items: category.children ? category.children.map(cat => getTree(cat)) : [],
    isCurrent: false,
    count: category?.itemCount[0]?.count || 0
  };
}

function getTreeItems(categoryTree: AgnosticCategoryTree): AgnosticCategoryTree[] {
  return categoryTree.items;
}

function findCategoryBySlug(categories: CategoryTreeItem[], slug: string): CategoryTreeItem {
  for (const category of categories) {
    if (getCategoryDetails(category.details)?.nameUrl === slug) {
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

function findCategoryPathById(categories: CategoryTreeItem[], id: number, path: CategoryTreeItem[] = []): CategoryTreeItem[] {
  for (const category of categories) {
    if (category.id === id) {
      return [...path, category];
    }
    if (category.children) {
      const foundPath = findCategoryPathById(category.children, id, [...path, category]);

      if (foundPath?.length > path?.length) {
        return foundPath;
      }
    }
  }
}

function getMappedBreadcrumbs(categories: CategoryTreeItem[], categoryId: number): AgnosticBreadcrumb[] {
  const categoryPath = findCategoryPathById(categories, categoryId);

  return categoryPath.map((category) => {
    const categoryDetails = getCategoryDetails(category.details);

    return {
      text: categoryDetails.name,
      link: '/c/' + categoryDetails.nameUrl
    };
  });
}

function getCategoryDetails(details:CategoryTreeItemDetails[]): CategoryTreeItemDetails | null {
  return details ? details[0] : null;
}

function getCount(category: AgnosticCategoryTree): number {
  return category ? category.count : 0;
}

function getLabel(category: AgnosticCategoryTree): string {
  return category ? category.label : '';
}

function getSlug(category: AgnosticCategoryTree): string {
  return category ? category.slug : '';
}

function getItems(category: AgnosticCategoryTree): AgnosticCategoryTree[] {
  return category ? category.items : [];
}

export const categoryTreeGetters: CategoryGetters<CategoryTreeItem> = {
  getTree,
  getCount,
  getLabel,
  getSlug,
  getItems,
  findCategoryBySlug,
  getCategoryDetails,
  findCategoryPathById,
  getTreeItems,
  getMappedBreadcrumbs
};
