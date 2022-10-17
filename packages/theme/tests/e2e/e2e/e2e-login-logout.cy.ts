import page from '../pages/factory';

const CYPRESS_DEFAULT_ACCOUNT_EMAIL = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_EMAIL');
const CYPRESS_DEFAULT_ACCOUNT_PASSWORD = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_PASSWORD');

context('Login and logout', () => {
  // Currently we do not mock or intercept API calls, so we just wait for everything to finish.
  const LONG_WAIT_TIME_IN_MS = 3000;

  beforeEach(function init() {
    page.home.visit();
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing or wrongfully formatted email', function test() {
    page.home.header.openAccount();
    cy.get('.sf-button').contains('login in to your account').click();
    cy.get('.sf-modal__content form').as('form');

    cy.get('@form').find('input#password').clear().type(CYPRESS_DEFAULT_ACCOUNT_PASSWORD, { force: true });
    cy.get('@form').find('button[type=submit]').click();
    cy.get('@form').contains('This field is required');

    cy.get('@form').find('input#email').clear().type('bad@email', { force: true });
    cy.get('@form').find('button[type=submit]').click();
    cy.get('@form').contains('Invalid email');
  });

  it(['exceptionPath', 'regression'], 'Fails login due to missing password', function test() {
    page.home.header.openAccount();
    cy.get('.sf-button').contains('login in to your account').click();
    cy.get('.sf-modal__content form').as('form');
    cy.get('@form').find('input#email').clear().type(CYPRESS_DEFAULT_ACCOUNT_EMAIL, { force: true });
    cy.get('@form').find('button[type=submit]').click();

    cy.get('@form').contains('This field is required');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrong email or wrong password', function test() {
    page.home.header.openAccount();
    cy.get('.sf-button').contains('login in to your account').click();
    cy.get('.sf-modal__content form').as('form');
    cy.get('@form').find('input#email').clear().type('wrong@email.com', { force: true });
    cy.get('@form').find('input#password').clear().type(CYPRESS_DEFAULT_ACCOUNT_PASSWORD, { force: true });
    cy.get('@form').find('button[type=submit]').click();

    cy.wait(LONG_WAIT_TIME_IN_MS);
    cy.get('@form').contains('Invalid username or password');

    cy.get('@form').find('input#email').clear().type(CYPRESS_DEFAULT_ACCOUNT_EMAIL, { force: true });
    cy.get('@form').find('input#password').clear().type('wrongPassword', { force: true });
    cy.get('@form').find('button[type=submit]').click();

    cy.wait(LONG_WAIT_TIME_IN_MS);
    cy.get('@form').contains('Invalid username or password');
  });

  it(['happyPath', 'regression'], 'Should login successfully, then logout', function test() {
    // Login
    page.home.header.openAccount();
    cy.get('.sf-button').contains('login in to your account').click();
    cy.get('.sf-modal__content form').as('form');
    cy.get('@form').find('input#email').clear().type(CYPRESS_DEFAULT_ACCOUNT_EMAIL, { force: true });
    cy.get('@form').find('input#password').clear().type(CYPRESS_DEFAULT_ACCOUNT_PASSWORD, { force: true });
    cy.get('@form').find('button[type=submit]').click();

    cy.wait(LONG_WAIT_TIME_IN_MS);

    cy.visit('/my-account');
    cy.get('body').contains('My Account');

    // Logout
    cy.get('[data-testId="Log out"').click();
    cy.wait(LONG_WAIT_TIME_IN_MS);

    page.home.header.openAccount();
    cy.get('body').contains('Your email');
  });

  it(['alternatePath', 'regression'], 'Should login successfully with remember clicked, then logout', function test() {
    // Login
    page.home.header.openAccount();
    cy.get('.sf-button').contains('login in to your account').click();
    cy.get('.sf-modal__content form').as('form');
    cy.get('@form').find('input#email').clear().type(CYPRESS_DEFAULT_ACCOUNT_EMAIL, { force: true });
    cy.get('@form').find('input#password').clear().type(CYPRESS_DEFAULT_ACCOUNT_PASSWORD, { force: true });
    cy.get('@form').find('label.sf-checkbox__container').click();
    cy.get('@form').find('button[type=submit]').click();

    cy.wait(LONG_WAIT_TIME_IN_MS);
    cy.wait(LONG_WAIT_TIME_IN_MS);

    cy.visit('/my-account');
    cy.get('body').contains('My Account');

    // Logout
    cy.get('[data-testId="Log out"').click();
    cy.wait(LONG_WAIT_TIME_IN_MS);
    page.home.header.openAccount();
    cy.get('body').contains('Your email');
  });
});
