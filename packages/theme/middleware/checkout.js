export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) {
    return;
  }
  const session = await $vsf.$plentymarkets.api.getSession();
  const isAuthenticated = session.user || session.guest;
  const redirectWithLocalePath = path => app.context.redirect(app.localePath(path));

  if (!isAuthenticated) {
    redirectWithLocalePath(currentPath);
  }

  switch (currentPath) {
    case 'login':
      break;
    case 'billing':
      break;
    case 'shipping':
      const BILLING_TYPE = 1;
      const billing = await $vsf.$plentymarkets.api.loadAddresses(BILLING_TYPE);
      if (billing.length <= 0) {
        redirectWithLocalePath('billing');
      }
      break;
    case 'payment':
      const SHIPPING_TYPE = 2;
      const shipping = await $vsf.$plentymarkets.api.loadAddresses(SHIPPING_TYPE);
      if (shipping.length <= 0) {
        redirectWithLocalePath('shipping');
      }
      break;
  }
};
