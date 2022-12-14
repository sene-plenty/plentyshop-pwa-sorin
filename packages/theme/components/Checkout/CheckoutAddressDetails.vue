<template>
  <div class="sf-shipping-details">
    <transition :name="transition">
      <div v-if="editAddress || addressList.length <= 0">
        <AddressInputForm
          ref="addressForm"
          :form="form"
          :countries="countries"
        ></AddressInputForm>
        <div class="buttons">
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
            v-if="(addressList.length > 0)"
            type="button"
            class="action-button color-secondary cancel-button"
            data-testid="update-address-button"
            @click="cancelEditing"
          >
            {{ $t('Cancel') }}</SfButton
          >
        </div>
      </div>
      <div v-else>
        <transition-group tag="div" :name="transition" class="shipping-list">
          <slot name="shipping-list">
            <div
              v-for="(address, key) in addressList"
              :key="address.id"
              class="shipping"
              :class="{ primaryAaddress: address.primary === 1 }"
              data-testid="shipping-address-list-item"
              @click="setDefaultAddress(address)"
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
                  <template v-if="(address.primary === 1)"><span class="color-secondary sf-badge">Selected address</span></template>
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
import { toRef } from '@nuxtjs/composition-api';
import { useAddressForm } from '@vue-storefront/plentymarkets';
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
    const {
      form,
      addresses: addressList,
      getCountryName,
      editAddress,
      editedAddress,
      changeAddress,
      resetForm,
      updateAddress,
      cancelEditing
    } = useAddressForm(props.countries, toRef(props, 'addresses'));

    const setDefaultAddress = (shipping) => {
      emit('set-default-address', shipping);
    };

    const submit = async () => {
      const addressForm = await refs.addressForm.validate();

      if (addressForm) {
        form.value = addressForm.value;
        updateAddress();
        emit('update:shipping', { ...form.value });
      }
    };

    const deleteAddress = (address) => {
      resetForm(address);
      emit('delete-address', address);
    };

    return {
      form,
      editAddress,
      addressList,
      editedAddress,
      submit,
      setDefaultAddress,
      changeAddress,
      deleteAddress,
      cancelEditing,
      getCountryName
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/components/templates/SfShippingDetails.scss';
.shipping-list {
  max-height: 40vh;
  overflow-y: auto;
}
.buttons {
  display: flex;
}
.shipping {
  cursor: pointer;
}
</style>
