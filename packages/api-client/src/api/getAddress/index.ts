import { AddressData, AddressOptionType, AddressType, Context } from 'src/types';

export async function loadAddresses(context: Context, typeId: AddressType): Promise<any> {
  const url: URL = new URL('/rest/io/customer/address', context.config.api.url);
  url.searchParams.set('typeId', typeId.toString());

  const { data } = await context.client.get(url.href);

  return (data.data as AddressData[]).map(addressData => mapAddressForClient(addressData));
}

export async function saveBillingIsShipping(context: Context): Promise<any> {
  const url: URL = new URL('/rest/io/customer/address/-99/', context.config.api.url);
  url.searchParams.set('typeId', AddressType.Shipping.toString());
  const { data } = await context.client.put(url.href, { supressNotifications: true, templateType: 'checkout'});
  return data;
}

export async function saveAddress(context: Context, typeId: AddressType = AddressType.Billing, addressData: AddressData): Promise<any> {
  const url: URL = new URL('/rest/io/customer/address/', context.config.api.url);

  url.searchParams.set('typeId', typeId.toString());

  const payload = {
    ...mapAddressForServer(addressData)
  };

  const { data } = await context.client.post(url.href, payload);

  return data.data;
}

function mapAddressForServer(addressData): object {
  return {
    id: addressData.id,
    gender: 'male',
    countryId: addressData.country,
    email: addressData.email,
    name1: null,
    name2: addressData.firstName,
    name3: addressData.lastName,
    vatNumber: '',
    contactPerson: '',
    address1: addressData.streetName,
    address2: addressData.apartment,
    postalCode: addressData.postalCode,
    town: addressData.city,
    telephone: addressData.phone,
    stateId: addressData.state
  };
}

function mapAddressForClient(addressData: AddressData) {
  const address = {
    id: addressData.id,
    firstName: addressData.name2,
    lastName: addressData.name3,
    streetName: addressData.address1,
    apartment: addressData.address2,
    city: addressData.town,
    state: addressData.stateId?.toString(),
    country: addressData.countryId?.toString(),
    postalCode: addressData.postalCode,
    phone: null,
    email: 'null'
  };

  addressData.options.forEach(option => {
    switch (option.typeId) {
      case AddressOptionType.Telephone:
        address.phone = option.value;
        break;
      case AddressOptionType.Email:
        address.email = option.value;
        break;
    }
  });

  return address;
}
