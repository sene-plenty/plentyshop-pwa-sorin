<template>
  <div id="billing">
    <CheckoutAddressDetails
      class="details"
      :shipping-tab-title="$t('Billing details')"
      :addresses="billing"
      :countries="countries"
      @set-default-address="setDefaultAddress({address: $event })"
      @delete-address="deleteAddress({address: $event})"
      @update:shipping="addAddress({address: $event})"
    />
    <div class="form">
        <div class="form__action">
          <SfButton
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="router.push(localePath({ name: 'login' }))"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-e2e="'continue-to-shipping'"
            class="form__action-button"
            @click="router.push(localePath({ name: 'shipping' }))"
            :disabled="(billing.length <= 0)"
          >
            {{ $t('Continue to shipping') }}
          </SfButton>
        </div>
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
import { useUser, useActiveShippingCountries, useUserBilling } from '@vue-storefront/plentymarkets';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails';
import AddressInputForm from '~/components/AddressInputForm';

export default {
  name: 'Billing',
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfCheckbox,
    CheckoutAddressDetails,
    AddressInputForm
  },
  setup() {
    const router = useRouter();
    const { load, billing, setDefaultAddress, deleteAddress, addAddress } = useUserBilling();
    const { isAuthenticated } = useUser();
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
      isAuthenticated,
      countries
    };
  }
};
</script>
<style lang="scss" scoped>
.details {
  margin-top: var(--spacer-lg);
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button, &__back-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        --button-margin: 0;
        text-align: left;
      }
    }
     &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color:  white;
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__back-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
</style>
