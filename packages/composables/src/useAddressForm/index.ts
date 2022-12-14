import { sharedRef } from '@vue-storefront/core';

export const useAddressForm = (id: string): any => {

  const form = sharedRef({
    firstName: '',
    lastName: '',
    streetName: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: ''
  }, id);

  const setForm = (formFields: any) => {
    form.value = formFields;
  };

  const validateForm = (fn) => async () => {
    const test = await fn();
    console.log(test);
  };

  return {
    form,
    setForm,
    validateForm
  };
};
