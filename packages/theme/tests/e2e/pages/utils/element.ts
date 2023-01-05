export function el(selector: string, children?: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return children ? cy.get(`[data-e2e="${selector}"] ${children}`) : cy.get(`[data-e2e="${selector}"]`);
}

/**
 * Generate a unique email address to use with a new account. Adding +<something> after your
 * username in your plenty/google email will ensure that you receive the email in your original
 * email account.
 */
export function uniquePlentyMarketsEmail (email: string): string {
  const parts = email.split('@');

  /*  if (parts[1] !== 'plentymarkets.com') {
    throw new Error('You must use a plentymarkets.com email address.');
  } */
  return `${parts[0].split('+')[0]}+${new Date().getTime()}@${parts[1]}`;
}
