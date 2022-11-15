export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) {
    return;
  }

  const cart = await $vsf.$plentymarkets.api.getCart();

  const redirectWithLocalePath = path => app.context.redirect(app.localePath(path));

  switch (currentPath) {
    case 'login':
      console.log('navigate to login');
      break;
    case 'billing':
      console.log('navigate to billing');
      break;
    case 'shipping':
      if (!cart.customerInvoiceAddressId) {
        redirectWithLocalePath('billing');
      }
      break;
    case 'payment':
      console.log('navigate to payment');
      break;
  }
};
