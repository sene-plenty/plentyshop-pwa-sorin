<template>
  <div id="shipping" v-if="!loading">
    <div class="spacer-top">
      <SfCheckbox
        v-model="sameAsShipping"
        v-e2e="'copy-address'"
        :label="$t('My billing and shipping address are the same')"
        name="copyShippingAddress"
        class="form__element"
      />
    </div>
    <div v-if="!sameAsShipping">
      <CheckoutAddressDetails
        class="spacer-top"
        :shipping-tab-title="$t('Shipping details')"
        :addresses="shipping"
        :countries="countries"
        @set-default-address="setDefaultAddress({ address: $event })"
        @delete-address="deleteAddress({ address: $event })"
        @update:shipping="addAddress({ address: $event })"
      />
    </div>
    <div class="spacer-top buttons">
          <SfButton
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="router.push(localePath({ name: 'billing' }))"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            class="form__action-button"
            @click="submit"
            :disabled="shipping.length <= 0 && !sameAsShipping"
          >
            {{ $t('Continue to payment') }}
          </SfButton>
      </div>
  </div>
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import { SfButton, SfCheckbox } from '@storefront-ui/vue';
import { ref, useRouter } from '@nuxtjs/composition-api';
import {
  useActiveShippingCountries,
  useUserShipping
} from '@vue-storefront/plentymarkets';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails';

export default {
  name: 'Shipping',
  components: {
    SfButton,
    SfCheckbox,
    CheckoutAddressDetails
  },
  setup(props, context) {
    const sameAsShipping = ref(false);
    const router = useRouter();
    const { load, loading, shipping, setDefaultAddress, deleteAddress, addAddress } = useUserShipping();
    const { load: loadActiveShippingCountries, result: countries } = useActiveShippingCountries();

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    const submit = async () => {
      if (sameAsShipping.value) {
        await addAddress({address: false});
      }
      router.push(context.root.localePath('payment'));
    };

    return {
      submit,
      sameAsShipping,
      setDefaultAddress,
      deleteAddress,
      addAddress,
      router,
      shipping,
      countries,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
.spacer-top {
  margin-top: var(--spacer-lg);
}
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
