import { Customer } from '../types/customer';
import { el } from './utils/element';

class Checkout {
  protected step: string;

  get heading(): Cypress.Chainable {
    return cy.get(`h3:contains("${Cypress._.capitalize(this.step)}")`);
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
    return el(`${this.step}-country`, 'select');
  }

  get zipcode(): Cypress.Chainable {
    return el(`${this.step}-zipcode`);
  }

  get phone(): Cypress.Chainable {
    return el(`${this.step}-phone`);
  }

  get email(): Cypress.Chainable {
    return el(`${this.step}-email`, 'input');
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
    this.country.select(customer.address.shipping.country);
    this.zipcode.type(customer.address.shipping.zipcode);
    this.phone.type(customer.address.shipping.phone);
    this.email.type(customer.address.shipping.email);
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
    this.country.select(customer.address.billing.country);
    this.zipcode.type(customer.address.billing.zipcode);
    this.phone.type(customer.address.billing.phone);
    this.email.type(customer.address.shipping.email);
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
