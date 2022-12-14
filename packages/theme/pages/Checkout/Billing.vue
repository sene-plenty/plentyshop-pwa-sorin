<template>
  <div id="billing">
    <CheckoutAddressDetails
      class="spacer-top"
      :shipping-tab-title="$t('Billing details')"
      :addresses="billing"
      :countries="countries"
      @set-default-address="setDefaultAddress({address: $event })"
      @delete-address="deleteAddress({address: $event})"
      @update:shipping="addAddress({address: $event})"
    />
    <div class="spacer-top buttons">
          <SfButton
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="router.push(localePath({ name: 'login' }))"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            class="form__action-button"
            @click="router.push(localePath({ name: 'shipping' }))"
            :disabled="(billing.length <= 0)"
          >
            {{ $t('Continue to shipping') }}
          </SfButton>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfButton,
  SfCheckbox,
  SfIcon
} from '@storefront-ui/vue';
import { useRouter } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useActiveShippingCountries, useUserBilling } from '@vue-storefront/plentymarkets';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails';

export default {
  name: 'Billing',
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfCheckbox,
    CheckoutAddressDetails
  },
  setup() {
    const router = useRouter();
    const { load, billing, setDefaultAddress, deleteAddress, addAddress } = useUserBilling();
    const { load: loadActiveShippingCountries, result: countries } = useActiveShippingCountries();

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    return {
      setDefaultAddress,
      deleteAddress,
      addAddress,
      router,
      billing,
      countries
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
