import { computed, ref } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';

export const useActiveShippingCountries = (): any => {
  const context = useVSFContext();

  const result = ref(null);

  const loading = ref(false);

  const error = ref({ search: null });

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
