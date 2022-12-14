<template>
  <div class="sf-shipping-details">
    <transition :name="transition">
      <SfTabs
        v-if="editAddress || addressList.length <= 0"
        key="edit-address"
        :open-tab="1"
        class="tab-orphan"
        data-testid="shipping-details-tabs"
      >
        <SfTab
          :title="
            editedAddress > -1 ? $t('Change the address') : $t('Create address')
          "
        >
          <slot name="change-address-description">
            <p class="message">
              {{ changeAddressDescription }}
            </p>
          </slot>
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
            type="button"
            class="action-button color-secondary cancel-button"
            data-testid="update-address-button"
            @click="cancelEditing"
          >
            {{ $t('Cancel') }}</SfButton
          >
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
                v-for="(address, key) in addressList"
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
import { SfTabs, SfButton, SfIcon } from '@storefront-ui/vue';
import { useAddressForm } from '@vue-storefront/plentymarkets';
import AddressInputForm from '~/components/AddressInputForm';
import { toRef } from '@nuxtjs/composition-api';

export default {
  name: 'MyAccountAddressDetails',
  components: {
    SfTabs,
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
.primary-icon {
  margin-right: var(--spacer-sm);
  cursor: pointer;
}
.shipping-list {
  max-height: 40vh;
  overflow-y: auto;
}
</style>
