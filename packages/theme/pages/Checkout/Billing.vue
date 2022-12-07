<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'billing-heading'"
      :level="3"
      :title="$t('Billing')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfSelect
      v-e2e="'addresses'"
      v-model="selectedAddress"
      label="Addresses"
      name="Addresses"
      class="form__element form__select sf-select--underlined"
      v-if="addresses.length > 0"
    >
      <SfSelectOption
        v-for="address in addresses"
        :key="address.id"
        :value="address.id"
      >
        {{ address.firstName }}{{ address.lastName }}
        {{ address.streetName }}{{ address.apartment }}
        {{ address.postalCode }}{{ address.city }} {{ address.state }}{{ address.country }}
      </SfSelectOption>
    </SfSelect>
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <div class="form">
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-firstName'"
            v-model="form.firstName"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="lastName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-lastName'"
            v-model="form.lastName"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="streetName"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-streetName'"
            v-model="form.streetName"
            label="Street name"
            name="streetName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="apartment"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-apartment'"
            v-model="form.apartment"
            label="House/Apartment number"
            name="apartment"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="city"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-city'"
            v-model="form.city"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
         <ValidationProvider
          name="state"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-e2e="'billing-state'"
            v-model="form.state"
            label="State/Province"
            name="state"
            class="form__element form__select sf-select--underlined"
            :disabled="states.length <= 0"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="state in states"
              :key="state.id"
              :value="state.id.toString()"
            >
              {{ state.name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="country"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-e2e="'billing-country'"
            v-model="form.country"
            label="Country"
            name="country"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="countryOption in countries"
              :key="countryOption.id"
              :value="countryOption.id.toString()"
            >
              {{ countryOption.name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="zipCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-zipcode'"
            v-model="form.postalCode"
            label="ZIP Code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="phone"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-phone'"
            v-model="form.phone"
            label="Phone number"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider v-if="!isAuthenticated" slim rules="required|email" v-slot="{ errors }">
          <SfInput
            v-e2e="'billing-email'"
            v-model="form.email"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            name="email"
            required
            label="Your email"
            class="form__element form__element--half form__element--half-even"
          />
        </ValidationProvider>
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="router.push(localePath({ name: 'shipping' }))"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-e2e="'continue-to-shipping'"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Continue to shipping') }}
          </SfButton>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox
} from '@storefront-ui/vue';
import { ref, useRouter, computed, watch } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useBilling, useUser, useActiveShippingCountries } from '@vue-storefront/plentymarkets';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number'
});

export default {
  name: 'Billing',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },
  setup(props, context) {
    const router = useRouter();
    const { load, save, billing } = useBilling();
    const { isAuthenticated } = useUser();
    const { load: loadActiveShippingCountries, result: activeShippingCountries } = useActiveShippingCountries();
    const countries = computed(() => activeShippingCountries.value);
    const states = ref([]);
    const addresses = ref([]);
    const selectedAddress = ref(null);

    const form = ref({
      firstName: '',
      lastName: '',
      streetName: '',
      apartment: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phone: null,
      email: ''
    });

    watch(() => form.value.country, async (newValue) => {
      const country = countries.value.find((country) => Number(country.id) === Number(newValue));
      if (country?.states <= 0) {
        form.value.state = null;
      }
      states.value = country?.states || [];
    });

    watch(() => selectedAddress.value, async (addressId) => {
      if (selectedAddress?.value) {
        const selectedAddress = addresses.value.find((address) => Number(address.id) === Number(addressId));
        if (selectedAddress && isAuthenticated) {
          form.value = selectedAddress;
        }
      }
    });

    const handleFormSubmit = async () => {
      await save({ billingDetails: form.value });
      router.push(context.root.localePath({ name: 'shipping' }));
    };

    const setExistingAddress = () => {
      if (billing.value) {
        addresses.value = billing.value;
        selectedAddress.value = billing.value[0]?.id?.toString();
      }
    };

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
      setExistingAddress();
    });

    setExistingAddress();

    return {
      router,
      form,
      handleFormSubmit,
      billing,
      isAuthenticated,
      countries,
      states,
      selectedAddress,
      addresses
    };
  }
};
</script>
<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.form {
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__group {
    display: flex;
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
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: var(--spacer-lg) 0;
    border: 1px solid var(--c-light);
    border-width: 1px 0;
  }
}
.payment-method {
  --radio-container-align-items: center;
  --ratio-content-margin: 0 0 0 var(--spacer-base);
  --radio-label-font-size: var(--font-base);
  --radio-background: transparent;
  white-space: nowrap;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0;
  }
  --radio-background: transparent;
  @include for-desktop {
    border: 0;
    --radio-border-radius: 4px;
  }
}
</style>
