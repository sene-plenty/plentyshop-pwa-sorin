<template>
  <div class="shipping" @click="setDefaultAddress(address)">
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
        <template v-if="address.primary === 1"
          ><span class="color-secondary sf-badge">{{
            $t('Selected address')
          }}</span></template
        >
      </slot>
    </div>
    <div class="shipping__actions">
      <SfIcon
        icon="cross"
        color="gray"
        size="14px"
        role="button"
        class="smartphone-only"
        @click="deleteAddress(address)"
      />
      <SfButton
        data-testid="change-address"
        @click="changeAddress(address)"
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
</template>

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';

export default {
  name: 'AddressCard',
  components: {SfButton, SfIcon},
  props: {
    address: {
      type: Object,
      default: () => {}
    },
    countries: {
      type: Array,
      default: () => []
    }
  },

  setup(props, {emit}) {

    const deleteAddress = (address) => {
      emit('delete-address', address);
    };

    const changeAddress = (address) => {
      emit('change-address', address);
    };

    const setDefaultAddress = (address) => {
      emit('set-default-address', address);
    };

    const getCountryName = (id) => {
      if (!props.countries) {
        return '';
      }
      const country = props.countries.find(
        (country) => Number(country.id) === Number(id)
      );
      return country.name || country.isoCode2;
    };

    return {
      getCountryName,
      deleteAddress,
      changeAddress,
      setDefaultAddress
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/components/templates/SfShippingDetails.scss';
.shipping {
  cursor: pointer;
}
</style>
