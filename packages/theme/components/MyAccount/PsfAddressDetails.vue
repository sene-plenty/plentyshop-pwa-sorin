<template>
  <div class="sf-shipping-details">
    <transition :name="transition">
      <SfTabs
        v-if="editAddress"
        key="edit-address"
        :open-tab="1"
        class="tab-orphan"
        data-testid="shipping-details-tabs"
      >
        <SfTab :title="editedAddress > -1 ? $t('Change the address') : $t('Create address')">
          <slot name="change-address-description">
            <p class="message">
              {{ changeAddressDescription }}
            </p>
          </slot>
          <ValidationObserver v-slot="{ handleSubmit }">
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
                    v-model="form.firstName"
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
                    v-model="form.lastName"
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
                    v-model="form.streetName"
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
                    v-model="form.apartment"
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
                    v-model="form.city"
                    name="city"
                    :label="$t('City')"
                    required
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    class="form__element form__element--half"
                  />
                </ValidationProvider>
                <ValidationProvider
                  name="state"
                  rules=""
                  v-slot="{ errors }"
                  slim
                >
                  <SfComponentSelect
                    v-model="form.state"
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
                      :key="state.id"
                      :value="state.id.toString()"
                    >
                      {{ state.name }}
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
                    v-model="form.zipCode"
                    name="zipCode"
                    :label="$t('ZIP code')"
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
                    v-model="form.country"
                    name="country"
                    :label="$t('Country')"
                    required
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    class="sf-component-select--underlined form__select form__element form__element--half form__element--half-even"
                    data-testid="country"
                  >
                    <SfComponentSelectOption
                      v-for="countryOption in countries"
                      :key="countryOption.id"
                      :value="countryOption.id.toString()"
                    >
                      {{ countryOption.name }}
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
                    v-model="form.phoneNumber"
                    name="phone"
                    :label="$t('Phone number')"
                    required
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    class="form__element"
                  />
                </ValidationProvider>

                <SfButton
                  type="submit"
                  @click.prevent="handleSubmit(updateAddress)"
                  class="action-button"
                  data-testid="update-address-button"
                >
                  <template v-if="editedAddress > -1">{{ $t('Update the address') }}</template>
                  <template v-if="editedAddress === -1">{{ $t('Create address') }}</template>
                </SfButton>
                <SfButton
                  type="button"
                  class="action-button color-secondary cancel-button"
                  data-testid="update-address-button"
                  @click="cancelEditing">
                  {{ $t('Cancel') }}</SfButton
                >
              </slot>
            </form>
          </ValidationObserver>
        </SfTab>
      </SfTabs>
      <SfTabs v-else key="address-list" :open-tab="1" class="tab-orphan">
        <SfTab :title="shippingTabTitle">
          <slot name="shipping-tab-description">
            <p class="message">
              {{ shipingTabDescription }}
            </p>
          </slot>
          <transition-group tag="div" :name="transition" class="shipping-list">
            <slot name="shipping-list">
              <div
                v-for="(address, key) in addresses"
                :key="address.id"
                class="shipping"
                :class="{ primaryAaddress: address.primary === 1 }"
                data-testid="shipping-address-list-item"
              >
                <div class="shipping__content">
                  <slot name="shipping-details">
                    <p class="shipping__address">
                      <span class="shipping__client-name"
                        >{{ address.firstName }} {{ address.lastName }}</span
                      ><br />
                      {{ address.streetName }} {{ address.apartment }}<br />{{
                        address.zipCode
                      }}
                      {{ address.city }},<br />{{
                        getCountryName(address.country)
                      }}
                    </p>
                    <p class="shipping__address">
                      {{ address.phoneNumber }}
                    </p>
                  </slot>
                </div>
                <div class="shipping__actions">
                  <SfIcon
                    icon="cross"
                    color="gray"
                    size="14px"
                    role="button"
                    class="smartphone-only"
                    @click="deleteAddress(key, address)"
                  />
                  <SfIcon
                    :icon="address.primary ? 'heart_fill' : 'heart'"
                    color="gray"
                    size="xxl"
                    class="primary-icon"
                    role="button"
                    @click="setDefaultAddress(address)"
                  />
                  <SfButton
                    data-testid="change-address"
                    @click="changeAddress(key, address)"
                  >
                    {{ $t('Change') }}
                  </SfButton>
                  <SfButton
                    class="shipping__button-delete desktop-only"
                    data-testid="delete-address"
                    @click="deleteAddress(address)"
                  >
                    {{ $t('Delete') }}
                  </SfButton>
                </div>
              </div>
            </slot>
          </transition-group>
          <SfButton
            class="action-button"
            data-testid="add-new-address"
            @click="changeAddress(-1)"
          >
            {{ $t('Add new address') }}</SfButton
          >
        </SfTab>
      </SfTabs>
    </transition>
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
import { ref, watch } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';

export default {
  name: 'PsfAddressDetails',
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
    addresses: {
      type: Array,
      default: () => []
    },
    countries: {
      type: Array,
      default: () => []
    },
    shippingTabTitle: {
      type: String,
      default: 'Shipping details'
    },
    transition: {
      type: String,
      default: 'sf-fade'
    },
    changeAddressDescription: {
      type: String,
      default: ''
    },
    shipingTabDescription: {
      type: String,
      default: ''
    }
  },

  setup(props, { emit }) {
    extend('required', {
      ...required,
      message: 'This field is required'
    });
    extend('min', {
      ...min,
      message: 'The field should have at least {length} characters'
    });

    const editAddress = ref(false);
    const editedAddress = ref(-1);
    const states = ref([]);
    const newForm = {
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
    const form = ref({ ...newForm });

    // show form if there are no saved addresses
    if (props?.addresses?.length <= 0) {
      editAddress.value = true;
    }

    const getCountryName = (id) => {
      if (!props.countries) {
        return '';
      }
      const country = props.countries.find(
        (country) => Number(country.id) === Number(id)
      );
      return country.name || country.isoCode2;
    };

    watch(
      () => form.value.country,
      async (newValue) => {
        const country = props.countries.find(
          (country) => Number(country.id) === Number(newValue)
        );
        if (country?.states <= 0) {
          form.value.state = null;
        }
        states.value = country?.states || [];
      }
    );

    const setDefaultAddress = (shipping) => {
      emit('set-default-address', shipping);
    };

    const changeAddress = (index) => {
      const address = props.addresses[index];
      if (index > -1) {
        form.value.firstName = address.firstName;
        form.value.lastName = address.lastName;
        form.value.streetName = address.streetName;
        form.value.apartment = address.apartment;
        form.value.city = address.city;
        form.value.state = address.state;
        form.value.zipCode = address.zipCode;
        form.value.country = address.country;
        form.value.phoneNumber = address.phoneNumber;
        editedAddress.value = index;
      } else {
        form.value = { ...newForm };
        editedAddress.value = index;
      }
      editAddress.value = true;
      emit('change-address', index);
    };

    const updateAddress = () => {
      const address = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        apartment: form.value.apartment,
        streetName: form.value.streetName,
        city: form.value.city,
        state: form.value.state,
        zipCode: form.value.zipCode,
        country: form.value.country,
        phoneNumber: form.value.phoneNumber
      };

      editAddress.value = false;
      emit('update:shipping', address);
    };

    const cancelEditing = () => {
      editAddress.value = false;
    };

    const deleteAddress = (address) => {
      emit('delete-address', address);
    };

    return {
      form,
      editAddress,
      editedAddress,
      states,
      setDefaultAddress,
      changeAddress,
      updateAddress,
      deleteAddress,
      cancelEditing,
      getCountryName
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/components/templates/SfShippingDetails.scss';
.primary-icon {
  margin-right: var(--spacer-sm);
  cursor: pointer;
}
.shipping-list{
  max-height: 40vh;
  overflow-y: auto;
}
</style>
