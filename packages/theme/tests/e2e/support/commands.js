/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import page from '../pages/factory';

Cypress.Commands.add('login', (email, password, isRememberChecked = false) => {
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
});
