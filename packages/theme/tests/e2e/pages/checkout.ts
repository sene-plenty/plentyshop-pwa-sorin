import { Customer } from '../types/customer';
import { el } from './utils/element';

class Checkout {
  protected step: string;

  get heading(): Cypress.Chainable {
    return cy.get(`h3:contains("${Cypress._.capitalize(this.step)}")`);
  }

  public url(): Cypress.Chainable {
    return cy.location('pathname').should('eq', `/checkout/${this.step}`);
  }

  get firstName(): Cypress.Chainable {
    return el(`${this.step}-firstName`, 'input');
  }

  get lastName(): Cypress.Chainable {
    return el(`${this.step}-lastName`);
  }

  get streetName(): Cypress.Chainable {
    return el(`${this.step}-streetName`);
  }

  get apartment(): Cypress.Chainable {
    return el(`${this.step}-apartment`);
  }

  get city(): Cypress.Chainable {
    return el(`${this.step}-city`);
  }

  get country(): Cypress.Chainable {
    return el(`${this.step}-country`);
  }

  get state(): Cypress.Chainable {
    return el(`${this.step}-state`);
  }

  get zipcode(): Cypress.Chainable {
    return el(`${this.step}-zipCode`);
  }

  get phone(): Cypress.Chainable {
    return el(`${this.step}-phoneNumber`);
  }

}

class CheckoutLogin {
  get continueAsGuest(): Cypress.Chainable {
    return el('checkoutlogin-continue-as-guest');
  }
}

class Shipping extends Checkout {
  constructor() {
    super();
    this.step = 'shipping';
  }

  get continueToPaymentButton(): Cypress.Chainable {
    return cy.contains('Continue to payment');
  }

  get selectShippingButton(): Cypress.Chainable {
    return cy.contains('Select shipping method');
  }

  get shippingMethods(): Cypress.Chainable {
    return el('shipping-method', 'label');
  }

  public fillForm(customer: Customer): void {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address.shipping.streetName);
    this.apartment.type(customer.address.shipping.apartment);
    this.city.type(customer.address.shipping.city);
    this.country.click();
    el(`${this.step}-country-${customer.address.shipping.country}`).click();
    this.zipcode.type(customer.address.shipping.zipCode);
    this.state.click();
    el(`${this.step}-state-${customer.address.shipping.state}`).click();
    this.phone.type(customer.address.shipping.phoneNumber);
  }
}

class Billing extends Checkout {
  constructor() {
    super();
    this.step = 'billing';
  }

  get continueToShipping(): Cypress.Chainable {
    return cy.contains('Continue to shipping');
  }

  public fillForm(customer: Customer): void {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address.billing.streetName);
    this.apartment.type(customer.address.billing.apartment);
    this.city.type(customer.address.billing.city);
    this.country.click();
    el(`${this.step}-country-${customer.address.billing.country}`).click();
    this.zipcode.type(customer.address.billing.zipCode);
    this.state.click();
    el(`${this.step}-state-${customer.address.billing.state}`).click();
    this.phone.type(customer.address.billing.phoneNumber);
  }

}

class Payment {
  get makeAnOrderButton(): Cypress.Chainable {
    return cy.contains('Make an order');
  }

  get paymentMethods(): Cypress.Chainable {
    return el('payment-method');
  }

  get terms(): Cypress.Chainable {
    return el('terms', 'label');
  }
}

class ThankYou {
  get heading(): Cypress.Chainable {
    return el('thank-you-banner', 'h2');
  }
}

export {
  CheckoutLogin,
  Shipping,
  Billing,
  Payment,
  ThankYou
};
