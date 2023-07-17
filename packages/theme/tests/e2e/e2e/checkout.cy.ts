import page from '../pages/factory';

context('Order placement', () => {
  beforeEach(function init() {
    cy.fixture('customer').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
    page.home.visit();
  });
  it(['happyPath', 'regression'], 'Should successfully place an order as a guest user', function test() {
    const data = this.fixtures.data;
    cy.intercept('/api/plentymarkets/addCartItem').as('addCartItem');
    cy.intercept('/api/plentymarkets/additionalInformation').as('additionalInformation');
    cy.intercept('/api/plentymarkets/executePayment').as('executePayment');
    cy.intercept('/api/plentymarkets/getActiveShippingCountries').as('getActiveShippingCountries');
    cy.intercept('/api/plentymarkets/getFacet').as('getFacet');
    cy.intercept('/api/plentymarkets/getPaymentProviders').as('getPaymentProviders');
    cy.intercept('/api/plentymarkets/getProduct').as('getProduct');
    cy.intercept('/api/plentymarkets/getShippingProvider').as('getShippingProvider');
    cy.intercept('/api/plentymarkets/loadAddresses').as('loadAddresses');
    cy.intercept('/api/plentymarkets/placeOrder').as('placeOrder');
    cy.intercept('/api/plentymarkets/preparePayment').as('preparePayment');
    cy.intercept('/api/plentymarkets/saveAddress').as('saveAddress');
    cy.intercept('/api/plentymarkets/registerUser').as('registerUser');
    cy.intercept('/api/plentymarkets/getOrder').as('getOrder');

    // With the current data, the first category does not have items. Therefore, we need to replace the
    // following selector: page.home.header.categories.first().click();
    cy.get('[data-e2e*="app-header"]').eq(1).find('a').click();
    cy.wait('@getFacet');

    page.category.products.first().click();
    cy.wait('@getProduct');

    page.product.addToCartButton.click();
    cy.wait('@addCartItem');

    page.product.header.openCart();
    cy.get('[data-e2e="collected-product"]').should('exist');
    page.cart.goToCheckoutButton.click();

    page.checkout.checkoutlogin.continueAsUser(data.customer);
    cy.wait(['@registerUser', '@getActiveShippingCountries']);

    page.checkout.billing.fillForm(data.customer);
    page.checkout.billing.continueToShipping.click();
    cy.wait(['@saveAddress', '@loadAddresses', '@getActiveShippingCountries']);

    page.checkout.shipping.continueToPaymentButton.click();
    cy.wait(['@saveAddress', '@loadAddresses', '@getShippingProvider', '@getPaymentProviders']);
    cy.get('[data-e2e*="shipping-method"]').should('exist');
    cy.get('[data-e2e*="payment-method"]').should('exist');

    page.checkout.payment.paymentMethods.eq(1).click();
    page.checkout.payment.terms.click();
    page.checkout.payment.makeAnOrderButton.click();
    cy.wait(['@additionalInformation', '@preparePayment', '@placeOrder', '@executePayment', '@getOrder']);

    page.checkout.thankyou.validate();

    // TODO: #40624
    // cy.reload()
    // page.product.header.openCart();
    // Assert that cart is empty
  });
});

context('Check Thank You Page', () => {
  beforeEach(function init() {
    cy.fixture('order').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });
  it(['happyPath', 'regression'], 'Should successfully see order items data in thank you page', function test() {
    cy.intercept('/api/plentymarkets/getOrder', { fixture: 'order.json' }).as('getOrder');

    page.checkout.thankyou.visit('', '', '');

    cy.wait('@getOrder');

    page.checkout.thankyou.validate();
  });
});


