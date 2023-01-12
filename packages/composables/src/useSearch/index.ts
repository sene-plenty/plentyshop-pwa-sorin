import { ItemSearchParams } from '@vue-storefront/plentymarkets-api';
import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';

export const useSearch = (id: string): any => {

  const context = useVSFContext();
  const result = sharedRef(null, `useCustom-${id}`);
  const loading = sharedRef(false, `useCustom-loading-${id}`);
  const error = sharedRef({
    search: null
  }, `useCustom-error-${id}`);

  const search = async (params: ItemSearchParams) => {

    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getSearch(params);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
