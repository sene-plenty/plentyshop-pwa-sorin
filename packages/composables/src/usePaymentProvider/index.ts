import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';

export const usePaymentProvider = (id: string): any => {

  const context = useVSFContext();
  const result = sharedRef(null, `useCustom-${id}`);
  const loading = sharedRef(false, `useCustom-loading-${id}`);
  const error = sharedRef({
    search: null
  }, `useCustom-error-${id}`);

  const load = async () => {
    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getPaymentProviders();
      console.log(result.value);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const save = async (paymentId, customQuery) => {
    await context.$plentymarkets.api.setPaymentProvider(paymentId);
    result.value.selected = paymentId;
  };

  return {
    load,
    save,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
