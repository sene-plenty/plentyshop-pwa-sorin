<template>
  <div>
    <p>
      <b>Please implement vendor-specific VsfShippingProvider component in the 'components/Checkout' directory</b>
    </p>

    <SfRadio v-e2e="'shipping-method'" v-for="method in shippingMethods" :key="method.value" :label="method.label"
      :value="method.value" :description="method.description" :selected="selectedMethod" name="shippingMethod"
      class="form__radio shipping" @change="selectMethod(method.value)">
      <div class="shipping__label">
        {{ shippingProviderGetters.getShippingMethodName(method) }}
      </div>

      <div class="shipping__description">
        {{ shippingProviderGetters.getShippingAmount(method) }}
      </div>
    </SfRadio>

    <SfButton v-e2e="'continue-to-billing'" :disabled="!selectedMethod" type="button" @click="$emit('submit')">
      {{  $t('Continue to billing')  }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';
import { useShippingProvider, shippingProviderGetters } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';

// const SHIPPING_METHODS = [
//   { label: 'Express US', value: 'express', description: 'Same day delivery' },
//   { label: 'Standard US', value: 'standard', description: 'Delivery in 5-6 working days' }

export default {
  name: 'VsfShippingProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup() {
    const selectedMethod = ref(null);
    const { load: loadShippingMethods, save: setShippingMethod, state: shippingProvider } = useShippingProvider();
    const shippingMethods = computed(() => shippingProviderGetters.getShippingProviders(shippingProvider));

    const selectMethod = method => setShippingMethod(method.value);

    onSSR(async () => {
      await loadShippingMethods();
    });

    return {
      shippingMethods,
      selectedMethod,
      selectMethod,
      shippingProviderGetters
    };
  }
};
</script>

<style lang="scss" scoped>;
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
