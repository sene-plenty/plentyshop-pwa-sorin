import page from '../pages/factory';

const CYPRESS_DEFAULT_ACCOUNT_EMAIL = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_EMAIL');
const CYPRESS_DEFAULT_ACCOUNT_PASSWORD = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_PASSWORD');

const loginHelper = (cy: Cypress.cy & CyEventEmitter, email: string, password: string, isRememberChecked = false): void => {
  // If the modal does not exit, click the open account. This helps with using the login
  // command multiple times inside the same test.
  cy.get('body').then($el => {
    if ($el.find('.sf-modal__content').length === 0) {
      page.home.header.openAccount();
    }
  }).wait(100);

  // if the login to your account button exists, click it
  cy.get('.sf-modal__content').then($el => {
    if ($el.find('button.sf-button:contains("login in to your account")').length > 0) {
      cy.get('.sf-modal__content').find('.sf-button').contains('login in to your account').click();
    }
  }).wait(100);

  cy.get('.sf-modal__content form').as('form');

  if (email) {
    cy.get('@form').find('input#email').clear().type(email, { force: true });
  }
  if (password) {
    cy.get('@form').find('input#password').clear().type(password, { force: true });
  }
  if (isRememberChecked) {
    cy.get('@form').find('label.sf-checkbox__container').click();
  }

  cy.get('@form').find('button[type=submit]').click();
};

context('Login and logout', () => {
  // CSS path to the login form. Please make sure you use it after the login command is given
  // (so that the modal containing it will be visible and open)
  const LOGIN_FORM_SELECTOR = '.sf-modal__content form';

  beforeEach(function init () {
    page.home.visit();
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing or wrongfully formatted email', function test() {
    loginHelper(cy, '', CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    cy.get(LOGIN_FORM_SELECTOR).contains('This field is required');

    loginHelper(cy, 'badEmail@', CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    cy.get(LOGIN_FORM_SELECTOR).contains('Invalid email');
  });

  it(['exceptionPath', 'regression'], 'Fails login due to missing password', function test() {
    loginHelper(cy, CYPRESS_DEFAULT_ACCOUNT_EMAIL, '');
    cy.get(LOGIN_FORM_SELECTOR).contains('This field is required');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrong email or wrong password', function test() {
    cy.intercept('/api/plentymarkets/loginUser').as('networkRequests');
    loginHelper(cy, 'wrong@email.com', CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    cy.wait('@networkRequests');
    cy.get(LOGIN_FORM_SELECTOR).contains('Invalid username or password');

    cy.intercept('/api/plentymarkets/loginUser').as('networkRequests');
    loginHelper(cy, CYPRESS_DEFAULT_ACCOUNT_EMAIL, 'wrongPassword');
    cy.wait('@networkRequests');
    cy.get(LOGIN_FORM_SELECTOR).contains('Invalid username or password');
  });

  it(['happyPath', 'regression'], 'Should login successfully, then logout', function test() {
    // Login
    cy.intercept('/api/plentymarkets/loginUser').as('networkRequests');
    loginHelper(cy, CYPRESS_DEFAULT_ACCOUNT_EMAIL, CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    cy.wait('@networkRequests').its('response.statusCode').should('eq', 200);

    cy.visit('/my-account');
    cy.get('body').contains('My Account');

    // // Logout
    cy.intercept('/api/plentymarkets/logoutUser').as('networkRequests');
    cy.get('[data-testId="Log out"').click();
    cy.wait('@networkRequests').its('response.statusCode').should('eq', 200);

    page.home.header.openAccount();
    cy.get('body').contains('Your email');
  });

  it(['alternatePath', 'regression'], 'Should login successfully with remember clicked, then logout', function test() {
    // Login
    cy.intercept('/api/plentymarkets/loginUser').as('networkRequests');
    loginHelper(cy, CYPRESS_DEFAULT_ACCOUNT_EMAIL, CYPRESS_DEFAULT_ACCOUNT_PASSWORD, true);
    cy.wait('@networkRequests').its('response.statusCode').should('eq', 200);

    cy.visit('/my-account');
    cy.get('body').contains('My Account');

    // // Logout
    cy.intercept('/api/plentymarkets/logoutUser').as('networkRequests');
    cy.get('[data-testId="Log out"').click();
    cy.wait('@networkRequests').its('response.statusCode').should('eq', 200);

    page.home.header.openAccount();
    cy.get('body').contains('Your email');
  });
});
