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
              type="button"
              class="action-button color-secondary cancel-button"
              data-testid="update-address-button"
              @click="closeForm"
            >
              {{ $t('Cancel') }}</SfButton
            >
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
              <AddressCard v-for="(address, key) in addressList"
                            class="shipping"
                            :key="address.id"
                            :address="address"
                            :countries="countries"
                            @set-default-address="setDefaultAddress(address)"
                            @change-address="changeAddress(key)"
                            @delete-address="deleteAddress(address)">
              </AddressCard>
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
import { SfTabs, SfButton } from '@storefront-ui/vue';
import { useAddressForm } from '@vue-storefront/plentymarkets';
import AddressInputForm from '~/components/AddressInputForm';
import AddressCard from '~/components/AddressCard';
import { toRef } from '@nuxtjs/composition-api';

export default {
  name: 'MyAccountAddressDetails',
  components: {
    SfTabs,
    SfButton,
    AddressInputForm,
    AddressCard
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
      closeForm
    } = useAddressForm(toRef(props, 'addresses'));

    const setDefaultAddress = (address) => {
      emit('set-default-address', address);
    };

    const submit = async () => {
      const addressForm = await refs.addressForm.validate();

      if (addressForm) {
        form.value = addressForm.value;
        closeForm();
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
      closeForm,
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
.buttons {
  display: flex;
}
</style>
