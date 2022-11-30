export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) {
    return;
  }

  const address = await $vsf.$plentymarkets.api.loadAddresses(1);
  const redirectWithLocalePath = path => app.context.redirect(app.localePath(path));

  switch (currentPath) {
    case 'login':
      if (address) {
        redirectWithLocalePath('billing');
      }
      break;
    case 'billing':
      console.log('navigate to billing');
      break;
    case 'shipping':
      if (!address) {
        redirectWithLocalePath('billing');
      }
      break;
    case 'payment':
      console.log('navigate to payment');
      break;
  }
};
