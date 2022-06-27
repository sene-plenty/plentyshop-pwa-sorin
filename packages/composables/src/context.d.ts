import { ApiClientMethods, IntegrationContext } from '@vue-storefront/core';
import { ClientInstance, PlentymarketsApiMethods, Config } from '@vue-storefront/plentymarkets-api';

declare module '@vue-storefront/core' {
  export interface Context {
    $plentymarkets: IntegrationContext<
      ClientInstance,
      Config,
      ApiClientMethods<PlentymarketsApiMethods>
    >;
  }
}
