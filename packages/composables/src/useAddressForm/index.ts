// import { sharedRef } from '@vue-storefront/core';
import { ref, Ref } from '@nuxtjs/composition-api';

export const useAddressForm = (addresses: Ref<any[]>): any => {

  const editAddress = ref(false);
  const editedAddress = ref(-1);

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

  const closeForm = () => {
    editAddress.value = false;
  };

  return {
    editAddress,
    editedAddress,
    addresses,
    form,
    closeForm,
    resetForm,
    changeAddress
  };
};
