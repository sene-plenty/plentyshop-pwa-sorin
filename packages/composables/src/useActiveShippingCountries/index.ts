import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';

export const useActiveShippingCountries = (): any => {
  const context = useVSFContext();

  const result = sharedRef(null, 'active-shipping-countries-result');

  const loading = sharedRef(false, 'active-shipping-countries-loading');

  const error = sharedRef({ search: null }, 'active-shipping-countries-error');

  const load = async () => {
    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getActiveShippingCountries();
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    load,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
