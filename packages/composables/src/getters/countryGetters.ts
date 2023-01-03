import type { Country, State } from '@vue-storefront/plentymarkets-api';

function getCountryId(country: Country): string {
  return country?.id?.toString() ?? '';
}

function getCountryName(country: Country): string {
  return country?.name ?? '';
}

function getCountryIsoCode(country: Country): string {
  return country?.isoCode2 ?? '';
}
function getStates(country: Country): State[] {
  return country?.states || [];
}

function getStateId(state: State): string {
  return state?.id?.toString() ?? '';
}

function getStateName(state: State): string {
  return state?.name ?? '';
}

export const countryGetters: any = {
  getStates,
  getStateId,
  getStateName,
  getCountryId,
  getCountryName,
  getCountryIsoCode
};
