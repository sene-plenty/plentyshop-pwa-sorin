<template>
  <div class="sf-shipping-details">
    <transition :name="transition">
      <div v-if="editAddress || addresses.length <= 0">
        <AddressInputForm
          ref="addressForm"
          :form="form"
          :countries="countries"
        ></AddressInputForm>
        <SfButton
          type="submit"
          @click.prevent="submit()"
          class="action-button"
          data-testid="update-address-button"
        >
          <template v-if="editedAddress > -1">{{
            $t('Update the address')
          }}</template>
          <template v-if="editedAddress === -1">{{
            $t('Create address')
          }}</template>
        </SfButton>
        <SfButton
          v-if="(addresses.length > 0)"
          type="button"
          class="action-button color-secondary cancel-button"
          data-testid="update-address-button"
          @click="cancelEditing"
        >
          {{ $t('Cancel') }}</SfButton
        >
      </div>
      <div v-else>
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
      </div>
    </transition>
  </div>
</template>
<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import AddressInputForm from '~/components/AddressInputForm';

export default {
  name: 'CheckoutAddressDetails',
  components: {
    SfButton,
    SfIcon,
    AddressInputForm
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
    }
  },

  setup(props, { emit, refs }) {
    const editAddress = ref(false);
    const editedAddress = ref(-1);
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

    const setDefaultAddress = (shipping) => {
      emit('set-default-address', shipping);
    };

    const changeAddress = (index) => {
      const address = props.addresses[index];
      if (index > -1) {
        form.value = { ...address };
        editedAddress.value = index;
      } else {
        form.value = { ...newForm };
        editedAddress.value = index;
      }
      editAddress.value = true;
      emit('change-address', index);
    };

    const updateAddress = () => {
      editAddress.value = false;
      emit('update:shipping', { ...form.value });
    };

    const submit = async () => {
      const addressForm = await refs.addressForm.validate();

      if (addressForm) {
        form.value = addressForm.value;
        updateAddress();
      }
    };

    const cancelEditing = () => {
      editAddress.value = false;
    };

    const deleteAddress = (address) => {
      form.value = { ...newForm };
      emit('delete-address', address);
    };

    return {
      form,
      editAddress,
      editedAddress,
      submit,
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
.shipping-list {
  max-height: 40vh;
  overflow-y: auto;
}
</style>
