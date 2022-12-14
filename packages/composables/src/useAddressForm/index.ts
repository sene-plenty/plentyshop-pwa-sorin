// import { sharedRef } from '@vue-storefront/core';
import { ref, Ref } from '@nuxtjs/composition-api';

const countries = ref([]);
export const useAddressForm = (_countries: any[], addresses: Ref<any[]>): any => {

  const editAddress = ref(false);
  const editedAddress = ref(-1);
  countries.value = _countries;

  const formModel = {
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

  const form = ref({...formModel});

  if (addresses.value?.length <= 0) {
    editAddress.value = true;
  }

  const getCountryName = (id) => {
    if (!countries.value) {
      return '';
    }
    const country = countries.value.find(
      (country) => Number(country.id) === Number(id)
    );
    return country.name || country.isoCode2;
  };

  const changeAddress = (index) => {
    const address = addresses.value[index];
    if (index > -1) {
      form.value = { ...address };
      editedAddress.value = index;
    } else {
      form.value = { ...formModel };
      editedAddress.value = index;
    }
    editAddress.value = true;
  };

  const resetForm = () => {
    form.value = {...formModel};
  };

  const updateAddress = () => {
    editAddress.value = false;
  };

  const cancelEditing = () => {
    editAddress.value = false;
  };

  const validateForm = (fn) => async () => {
    const test = await fn();
    console.log(test);
  };

  return {
    editAddress,
    editedAddress,
    addresses,
    countries,
    form,
    cancelEditing,
    updateAddress,
    resetForm,
    changeAddress,
    validateForm,
    getCountryName
  };
};
