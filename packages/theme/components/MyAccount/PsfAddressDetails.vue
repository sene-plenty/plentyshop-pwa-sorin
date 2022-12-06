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
        <SfTab :title="changeAddressTabTitle">
          <slot name="change-address-description">
            <p class="message">
              {{ changeAddressDescription }}
            </p>
          </slot>
          <div class="form">
            <slot name="form">
              <SfInput
                v-model="form.firstName"
                name="firstName"
                :label="inputsLabels[0]"
                required
                class="form__element form__element--half"
              />
              <SfInput
                v-model="form.lastName"
                name="lastName"
                :label="inputsLabels[1]"
                required
                class="
                  form__element form__element--half form__element--half-even
                "
              />
              <SfInput
                v-model="form.streetName"
                name="streetName"
                :label="inputsLabels[2]"
                required
                class="form__element"
              />
              <SfInput
                v-model="form.apartment"
                name="apartment"
                :label="inputsLabels[3]"
                required
                class="form__element"
              />
              <SfInput
                v-model="form.city"
                name="city"
                :label="inputsLabels[4]"
                required
                class="form__element form__element--half"
              />
              <SfComponentSelect
                v-model="form.state"
                name="country"
                :label="inputsLabels[5]"
                :disabled="states.length <= 0"
                required
                class="
                  sf-component-select--underlined
                  form__select
                  form__element
                  form__element--half
                  form__element--half-even
                "
                data-testid="country"
              >
                <SfComponentSelectOption
                  v-for="state in states"
                  :key="state.id"
                  :value="state.id.toString()"
                >
                  {{ state.name }}
                </SfComponentSelectOption>
              </SfComponentSelect>
              <SfInput
                v-model="form.zipCode"
                name="zipCode"
                :label="inputsLabels[6]"
                required
                class="form__element form__element--half"
              />
              <SfComponentSelect
                v-model="form.country"
                name="country"
                :label="selectLabel"
                required
                class="
                  sf-component-select--underlined
                  form__select
                  form__element
                  form__element--half
                  form__element--half-even
                "
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
              <SfInput
                v-model="form.phoneNumber"
                name="phone"
                :label="inputsLabels[7]"
                required
                class="form__element"
              />
              <SfButton
                v-if="updateAddressButtonText"
                class="action-button"
                data-testid="update-address-button"
                @click="updateAddress"
              >
                {{ updateAddressButtonText }}</SfButton
              >
              <SfButton
                v-if="cancelButtonText"
                class="action-button color-secondary cancel-button"
                data-testid="update-address-button"
                @click="cancelEditing"
              >
                {{ cancelButtonText }}</SfButton
              >
            </slot>
          </div>
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
                :key="(address.id)"
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
                      {{ address.city }},<br />{{ getCountryName(address.country) }}
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
                    v-if="changeButtonText"
                    data-testid="change-address"
                    @click="changeAddress(key, address)"
                  >
                    {{ changeButtonText }}
                  </SfButton>
                  <SfButton
                    v-if="deleteButtonText"
                    class="shipping__button-delete desktop-only"
                    data-testid="delete-address"
                    @click="deleteAddress(address)"
                  >
                    {{ deleteButtonText }}
                  </SfButton>
                </div>
              </div>
            </slot>
          </transition-group>
          <SfButton
            v-if="addNewAddressButtonText"
            class="action-button"
            data-testid="add-new-address"
            @click="changeAddress(-1)"
          >
            {{ addNewAddressButtonText }}</SfButton
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

export default {
  name: 'PsfAddressDetails',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfComponentSelect,
    SfIcon
  },
  props: {
    shippingTabTitle: {
      type: String,
      default: 'Shipping details'
    },
    changeAddressTabTitle: {
      type: String,
      default: 'Change the address'
    },
    addresses: {
      type: Array,
      default: () => ([])
    },
    transition: {
      type: String,
      default: 'sf-fade'
    },
    changeAddressDescription: {
      type: String,
      default: ''
    },
    changeButtonText: {
      type: String,
      default: 'Change'
    },
    deleteButtonText: {
      type: String,
      default: 'Delete'
    },
    addNewAddressButtonText: {
      type: String,
      default: 'Add new address'
    },
    updateAddressButtonText: {
      type: String,
      default: 'Update the address'
    },
    cancelButtonText: {
      type: String,
      default: 'Cancel'
    },
    inputsLabels: {
      type: Array,
      default: () => [
        'First Name',
        'Last Name',
        'Street Name',
        'House/Apartment number',
        'City',
        'State/Province',
        'Zip-Code',
        'Phone number'
      ]
    },
    selectLabel: {
      type: String,
      default: 'Country'
    },
    shipingTabDescription: {
      type: String,
      default: ''
    },
    countries: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { emit }) {

    const editAddress = ref(false);
    const editedAddress = ref(-1);
    const states = ref([]);
    const form = ref({
      firstName: '',
      lastName: '',
      streetName: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: ''
    });

    const getCountryName = (id) => {
      const country = props.countries.find((country) => Number(country.id) === Number(id));
      return country.name || country.isoCode2;
    };

    watch(() => form.value.country, async (newValue) => {
      const country = props.countries.find((country) => Number(country.id) === Number(newValue));
      if (country?.states <= 0) {
        form.value.state = null;
      }
      states.value = country?.states || [];
    });

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
        form.value = {};
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

    return { form, editAddress, editedAddress, states, setDefaultAddress, changeAddress, updateAddress, deleteAddress, cancelEditing, getCountryName};
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfShippingDetails.scss";
.primary-icon {
  margin-right: var(--spacer-sm);
  cursor: pointer;
}
</style>
