<template>
  <div class="sf-shipping-details">
    <ValidationObserver ref="validationObserver">
      <form class="form">
        <slot name="form">
          <ValidationProvider
            name="firstName"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-e2e="'billing-firstName'"
              v-model="internalForm.firstName"
              :label="$t('First Name')"
              name="firstName"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element form__element--half"
            />
          </ValidationProvider>
          <ValidationProvider
            name="lastName"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-model="internalForm.lastName"
              name="lastName"
              :label="$t('Last Name')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element form__element--half form__element--half-even"
            />
          </ValidationProvider>
          <ValidationProvider
            name="streetName"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-model="internalForm.streetName"
              name="streetName"
              :label="$t('Street Name')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            name="apartment"
            rules="required|min:1"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-model="internalForm.apartment"
              name="apartment"
              :label="$t('House/Apartment number')"
              required
              class="form__element"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            name="city"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-model="internalForm.city"
              name="city"
              :label="$t('City')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element form__element--half"
            />
          </ValidationProvider>
          <ValidationProvider
            name="country"
            rules="required|min:1"
            v-slot="{ errors }"
            slim
          >
            <SfComponentSelect
              v-model="internalForm.country"
              name="country"
              :label="$t('Country')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="sf-component-select--underlined form__select form__element form__element--half form__element--half-even"
              data-testid="country"
            >
              <SfComponentSelectOption
                v-for="country in countries"
                :key="countryGetters.getCountryId(country)"
                :value="countryGetters.getCountryId(country)"
              >
                {{ countryGetters.getCountryName(country) }}
              </SfComponentSelectOption>
            </SfComponentSelect>
          </ValidationProvider>
          <ValidationProvider
            name="zipCode"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-model="internalForm.zipCode"
              name="zipCode"
              :label="$t('ZIP code')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element form__element--half"
            />
          </ValidationProvider>
          <ValidationProvider name="state" rules="" v-slot="{ errors }" slim>
            <SfComponentSelect
              v-model="internalForm.state"
              name="state"
              :label="$t('State/Province')"
              :disabled="states.length <= 0"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="sf-component-select--underlined form__select form__element form__element--half form__element--half-even"
              data-testid="state"
            >
              <SfComponentSelectOption
                v-for="state in states"
                :key="countryGetters.getStateId(state)"
                :value="countryGetters.getStateId(state)"
              >
                {{ countryGetters.getStateName(state) }}
              </SfComponentSelectOption>
            </SfComponentSelect>
          </ValidationProvider>
          <ValidationProvider
            name="phoneNumber"
            rules="required|min:5"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-model="internalForm.phoneNumber"
              name="phone"
              :label="$t('Phone number')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
        </slot>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import {
  SfTabs,
  SfInput,
  SfButton,
  SfComponentSelect,
  SfIcon
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';
import { watch, ref } from '@nuxtjs/composition-api';
import { countryGetters } from '@vue-storefront/plentymarkets';

export default {
  name: 'AddressInputForm',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfComponentSelect,
    SfIcon,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    countries: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { refs }) {
    extend('required', {
      ...required,
      message: 'This field is required'
    });
    extend('min', {
      ...min,
      message: 'The field should have at least {length} characters'
    });

    const internalForm = ref(props.form);
    const states = ref([]);

    if (!internalForm?.value?.firstName) {
      internalForm.value = {
        firstName: '',
        lastName: '',
        streetName: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: ''
      };
    }

    const validate = async () => {
      const validation = await refs.validationObserver.validateWithInfo();
      if (validation.isValid) {
        return internalForm;
      }
      return false;
    };

    const setStates = (countryId) => {
      const country = props.countries.find(
        (country) => Number(country.id) === Number(countryId)
      );
      if (countryGetters.getStates(country) <= 0) {
        internalForm.value.state = null;
      }
      states.value = countryGetters.getStates(country);
    };

    watch(
      () => internalForm.value.country,
      async (countryId) => {
        setStates(countryId);
      }
    );

    setStates(internalForm.value.country);

    return {
      validate,
      internalForm,
      states,
      countryGetters
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/components/templates/SfShippingDetails.scss';
</style>
