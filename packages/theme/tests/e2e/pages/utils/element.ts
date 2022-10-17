export function el(selector: string, children?: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return children ? cy.get(`[data-e2e="${selector}"] ${children}`) : cy.get(`[data-e2e="${selector}"]`);
}
