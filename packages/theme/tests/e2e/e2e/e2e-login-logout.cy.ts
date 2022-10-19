import page from '../pages/factory';

const CYPRESS_DEFAULT_ACCOUNT_EMAIL = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_EMAIL');
const CYPRESS_DEFAULT_ACCOUNT_PASSWORD = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_PASSWORD');

context('Login and logout', () => {
  // Currently we do not mock or intercept API calls, so we just wait for everything to finish.
  const LONG_WAIT_TIME_IN_MS = 3000;

  // CSS path to the login form. Please make sure you use it after the login command is given
  // (so that the modal containing it will be visible and open)
  const LOGIN_FORM_SELECTOR = '.sf-modal__content form';

  it(['exceptionPath', 'regression'], 'Fails due to missing or wrongfully formatted email', function test() {
    cy.login('', CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    cy.get(LOGIN_FORM_SELECTOR).contains('This field is required');

    cy.login('badEmail@', CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    cy.get(LOGIN_FORM_SELECTOR).contains('Invalid email');
  });

  it(['exceptionPath', 'regression'], 'Fails login due to missing password', function test() {
    cy.login(CYPRESS_DEFAULT_ACCOUNT_EMAIL, '');
    cy.get(LOGIN_FORM_SELECTOR).contains('This field is required');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrong email or wrong password', function test() {
    cy.login('wrong@email.com', CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    cy.get(LOGIN_FORM_SELECTOR).contains('Invalid username or password');

    cy.login(CYPRESS_DEFAULT_ACCOUNT_EMAIL, 'wrongPassword');
    cy.get(LOGIN_FORM_SELECTOR).contains('Invalid username or password');
  });

  it(['happyPath', 'regression'], 'Should login successfully, then logout', function test() {
    // Login
    cy.login(CYPRESS_DEFAULT_ACCOUNT_EMAIL, CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
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
    cy.login(CYPRESS_DEFAULT_ACCOUNT_EMAIL, CYPRESS_DEFAULT_ACCOUNT_PASSWORD, true);
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
