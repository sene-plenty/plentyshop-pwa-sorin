import page from '../pages/factory';

const CYPRESS_DEFAULT_ACCOUNT_EMAIL = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_EMAIL');
const CYPRESS_DEFAULT_ACCOUNT_PASSWORD = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_PASSWORD');

/**
 * Generate a unique email address to use with a new account. Adding +<something> after your
 * username in your plenty/google email will ensure that you receive the email in your original
 * email account.
 */
const uniquePlentyMarketsEmail = (email: string): string => {
  const parts = email.split('@');
  if (parts[1] !== 'plentymarkets.com') {
    throw new Error('You must use a plentymarkets.com email address.');
  }

  return `${parts[0].split('+')[0]}+${new Date().getTime()}@${parts[1]}`;
};

context('Register account', () => {
  // CSS path to the register form. Please make sure you use it after the login command is given
  // (so that the modal containing it will be visible and open)
  const REGISTER_FORM_SELECTOR = '.sf-modal__content form';

  beforeEach(function init () {
    page.home.visit();
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing data or wrongfully formatted email', function test() {
    page.home.header.openAccount();

    cy.get(REGISTER_FORM_SELECTOR).as('form');
    cy.get('@form').find('button[type=submit]').as('submit');

    cy.get('@submit').click();
    cy.get('@form').contains('This field is required');

    cy.get('@form').find('input#email').clear().type('wrong@email', { force: true });
    cy.get('@form').find('input#first-name').clear().type('Plenty', { force: true });
    cy.get('@form').find('input#last-name').clear().type('Markets', { force: true });
    cy.get('@form').find('input#password').clear().type(CYPRESS_DEFAULT_ACCOUNT_PASSWORD, { force: true });
    cy.get('@form').find('label.sf-checkbox__container').click();

    cy.get('@submit').click();
    cy.get('@form').contains('Invalid email');
  });

  it(['happyPath', 'regression'], 'Should register an new account', function test() {
    page.home.header.openAccount();

    cy.get(REGISTER_FORM_SELECTOR).as('form');
    cy.get('@form').find('button[type=submit]').as('submit');

    cy.get('@form').find('input#email').clear().type(uniquePlentyMarketsEmail(CYPRESS_DEFAULT_ACCOUNT_EMAIL), { force: true });
    cy.get('@form').find('input#first-name').clear().type('Plenty', { force: true });
    cy.get('@form').find('input#last-name').clear().type('Markets', { force: true });
    cy.get('@form').find('input#password').clear().type(CYPRESS_DEFAULT_ACCOUNT_PASSWORD, { force: true });
    cy.get('@form').find('label.sf-checkbox__container').click();

    cy.intercept('/api/plentymarkets/registerUser').as('networkRequests');
    cy.get('@submit').click();
    cy.wait('@networkRequests').its('response.statusCode').should('eq', 200);

    cy.visit('/my-account');
    cy.get('body').contains('My Account');
  });
});
