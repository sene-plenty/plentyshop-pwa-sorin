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
  page.home.visit();

  page.home.header.openAccount();
  cy.get('.sf-button').contains('login in to your account').click();
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

  cy.wait(1000);
});
