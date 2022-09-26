<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      :title="$t('Shipping')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <SfCheckbox
        v-e2e="'copy-address'"
        :selected="sameAsShipping"
        :label="$t('My billing and shipping address are the same')"
        name="copyShippingAddress"
        class="form__element"
        @change="handleCheckSameAddress($event)"
      />
      <div class="form" v-if="!sameAsShipping">
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
            label="Zip-code"
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
            v-e2e="'login-modal-email'"
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
            v-if="!isFormSubmitted"
            :disabled="loading"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Select shipping method') }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isFormSubmitted"
        @submit="router.push(localePath({ name: 'payment' }))"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect
} from '@storefront-ui/vue';
import { ref, useRouter, computed, watch } from '@nuxtjs/composition-api';
import { useShipping, useShippingProvider, useBilling, useUser, useActiveShippingCountries } from '@vue-storefront/plentymarkets';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { SfCheckbox } from '@storefront-ui/vue';

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
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    VsfShippingProvider: () =>
      import('~/components/Checkout/VsfShippingProvider')
  },
  setup () {
    const router = useRouter();
    const isFormSubmitted = ref(false);
    const { load: loadShipping, save, loading, shipping } = useShipping();
    const { load: loadShippingProvider } = useShippingProvider();
    const { load: loadBilling, billing } = useBilling();
    const { isAuthenticated } = useUser();
    const { load: loadActiveShippingCountries, result: activeShippingCountries } = useActiveShippingCountries();
    const countries = computed(() => activeShippingCountries.value);
    const states = ref([]);

    const sameAsShipping = ref(false);

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

    const handleCheckSameAddress = async value => {
      sameAsShipping.value = value;
    };

    const handleFormSubmit = async () => {
      if (sameAsShipping.value) {
        await loadBilling();

        // TODO: check if we need to send anything at all (-99?)
        await save({ shippingDetails: billing.value });
      } else {
        await save({ shippingDetails: form.value });
      }

      isFormSubmitted.value = true;
    };

    const setExistingAddress = () => {
      if (shipping.value) {
        form.value = shipping.value;
      }
    };

    onSSR(async () => {
      await loadShipping();
      await loadShippingProvider();
      await loadBilling();
      await loadActiveShippingCountries();
      setExistingAddress();
    });

    setExistingAddress();

    return {
      billing,
      router,
      loading,
      isFormSubmitted,
      sameAsShipping,
      form,
      states,
      countries,
      handleCheckSameAddress,
      handleFormSubmit,
      isAuthenticated
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;

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
    --button-width: auto;
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

  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }

  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
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
      color: var(--c-white);
    }

    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

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

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
