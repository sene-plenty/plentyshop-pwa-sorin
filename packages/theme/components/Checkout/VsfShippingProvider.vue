<template>
  <div v-if="shippingMethods && shippingMethods.length > 0">
    <SfRadio
      v-e2e="'shipping-method'"
      v-for="method in shippingMethods"
      :key="method.parcelServicePresetId.toString()"
      :value="method.parcelServicePresetId.toString()"
      :selected="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      @change="selectMethod(method)"
      :label="shippingProviderGetters.getShippingMethodName(method)"
      :description="shippingProviderGetters.getShippingAmount(method)"
    >
    </SfRadio>

    <SfButton
      v-e2e="'continue-to-billing'"
      :disabled="!selectedMethod"
      type="button"
      @click="$emit('submit')"
    >
      {{ $t('Continue to payment') }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';
import {
  useShippingProvider,
  shippingProviderGetters
} from '@vue-storefront/plentymarkets';

export default {
  name: 'VsfShippingProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup () {
    const selectedMethod = ref(null);
    const {
      save,
      load,
      state: shippingProvider
    } = useShippingProvider();
    const shippingMethods = computed(() => {
      return shippingProviderGetters.getShippingProviders(shippingProvider.value);
    });

    const selectMethod = async (method) => {
      await save({ shippingMethod: shippingProviderGetters.getValue(method)});
      // TODO: return list of shipping providers on selection
      await load();
      selectedMethod.value = method.parcelServicePresetId.toString();
    };

    return {
      shippingMethods,
      selectedMethod,
      selectMethod,
      shippingProviderGetters
    };
  }
};
</script>

<style lang="scss" scoped>
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
