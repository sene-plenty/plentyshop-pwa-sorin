import { AddressType } from './../../types';
import { Context } from 'src/types';
import { TODO } from '../../types';

export async function saveAddress(context: Context, typeId: AddressType = AddressType.Billing, addressData: TODO): Promise<any> {
  // console.log('saveAddress', typeId, addressData);
  const url: URL = new URL('/rest/io/customer/address/', context.config.api.url);

  url.searchParams.set('typeId', typeId.toString());

  const payload = {
    ...mapAddressData(addressData)
  };

  const { data } = await context.client.post(url.href, payload);

  console.log('Result', data);
}

function mapAddressData(addressData): object {
  return {
    gender: 'male',
    countryId: mapCountryId(addressData.country),
    email: 'christoph.johannsen@plentymarkets.com',
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
