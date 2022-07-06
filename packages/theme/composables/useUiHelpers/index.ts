
import { useRoute, getCurrentInstance } from '@nuxtjs/composition-api';

const getContext = () => {
  const vm = getCurrentInstance();
  return vm.root.proxy;
};

const nonFilters = ['page', 'sort', 'term', 'itemsPerPage'];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUiHelpers = () => {

  const context = getContext();
  const getFacetsFromURL = () => {
    const route = useRoute();
    const { query, params } = context.$router.currentRoute;
    console.log(query, params);
    return {
      categorySlug: route.value.path.split('/').pop(),
      page: 1,
      sort: query.sort,
      facets: query.facets
    } as any;
  };

  // eslint-disable-next-line
  const getCatLink = (category): string => {
    console.warn('[VSF] please implement useUiHelpers.getCatLink.');
    console.log('__category', category);
    return `/c/${category.slug}`;
  };

  // eslint-disable-next-line
  const changeSorting = (sort) => {
    const { query } = context.$router.currentRoute;
    context.$router.push({ query: { ...query, sort } });
  };

  const reduceFilters = (query) => (prev, curr) => {
    const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

    return {
      ...prev,
      [curr]: makeArray ? query[curr] : [query[curr]]
    };
  };

  const getFiltersDataFromUrl = (context, onlyFilters) => {
    const { query } = context.$router.history.current;

    return Object.keys(query)
      .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
      .reduce(reduceFilters(query), {});
  };

  // eslint-disable-next-line
  const changeFilters = (filters) => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        facets: Object.values(filters).filter((entry: string []) => entry.length > 0).join(',')
      }
    });
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage) => {
    console.warn('[VSF] please implement useUiHelpers.changeItemsPerPage.');
  };

  // eslint-disable-next-line
  const setTermForUrl = (term: string) => {
    console.warn('[VSF] please implement useUiHelpers.changeSearchTerm.');
  };

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetColor.');

    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  const getSearchTermFromUrl = () => {
    console.warn('[VSF] please implement useUiHelpers.getSearchTermFromUrl.');
  };

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl
  };
};

export default useUiHelpers;
