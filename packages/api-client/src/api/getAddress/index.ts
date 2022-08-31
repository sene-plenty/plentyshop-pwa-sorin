import { AddressType } from './../../types';
import { Context } from 'src/types';
import { TODO } from '../../types';

export async function loadAddresses(context: Context, typeId: AddressType): Promise<any> {
  const url: URL = new URL('/rest/io/customer/address', context.config.api.url);

  url.searchParams.set('typeId', typeId.toString());

  const { data } = await context.client.get(url.href);

  console.log('LOAD ADDRESS RESULT', data);

  return data;
}

export async function saveAddress(context: Context, typeId: AddressType = AddressType.Billing, addressData: TODO): Promise<any> {
  const url: URL = new URL('/rest/io/customer/address/', context.config.api.url);

  url.searchParams.set('typeId', typeId.toString());

  const payload = {
    ...mapAddressData(addressData)
  };

  const { data } = await context.client.post(url.href, payload);

  return data.data;
}

function mapAddressData(addressData): object {
  return {
    gender: 'male',
    countryId: mapCountryId(addressData.country),
    email: addressData.email,
    name1: null,
    name2: addressData.firstName,
    name3: addressData.lastName,
    vatNumber: '',
    contactPerson: '',
    address1: addressData.streetName,
    address2: addressData.apartment,
    postalCode: addressData.postalCode,
    town: addressData.city
  };
}

function mapCountryId(countryCode: string): number {
  return countryCode === 'de' ? 1 : 2;
}
