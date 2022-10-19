import page from '../pages/factory';

context('Order placement', () => {
  beforeEach(function init () {
    cy.fixture('test-data/e2e-place-order').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it(['happyPath', 'regression'], 'Should successfully place an order', function test () {
    const data = this.fixtures.data;
    page.home.visit();
    // page.home.header.categories.first().click();
    cy.get('[data-e2e*="app-header"]').eq(1).find('a').click();

    page.category.products.first().click();

    // Ensure all requests are done
    cy.wait(2000);

    page.product.addToCartButton.click();
    page.product.header.openCart();
    page.cart.goToCheckoutButton.click();
    page.checkout.shipping.heading.should('be.visible');
    page.checkout.shipping.fillForm(data.customer);
    page.checkout.shipping.selectShippingButton.click();
    page.checkout.shipping.shippingMethods.first().click();
    page.checkout.shipping.continueToBillingButton.click();
    page.checkout.billing.heading.should('be.visible');
    page.checkout.billing.fillForm(data.customer);
    page.checkout.billing.continueToPaymentButton.click();
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.terms.click();
    page.checkout.payment.makeAnOrderButton.click();
    page.checkout.thankyou.heading.should('be.visible');
  });
});
