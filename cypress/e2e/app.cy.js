describe('Postcode Checker App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('shows initial message', () => {
    cy.contains('Please enter a postcode above');
  });

  it('shows a positive message if the user submits a valid postcode', () => {
    cy.get('input').type('SE1 7QD');
    cy.contains('button', 'Submit').click();
    cy.contains('The postcode is in the service area', { timeout: 5000 }).should('be.visible');
  });

  it('shows not in service area for invalid postcode', () => {
    cy.get('input').type('E1 1AA');
    cy.contains('button', 'Submit').click();
    cy.contains(/Not in the service area/i, { timeout: 5000 }).should('be.visible');
  });

  it('shows validation message on typing malformed postcode', () => {
    cy.get('input').clear().type('1234500');
    cy.contains('button', 'Submit').click();
    cy.contains('⚠ Please enter a valid UK postcode', { timeout: 5000 }).should('be.visible');
  });

  it('shows a positive message for postcodes from allow list', () => {
    cy.get('input').clear().type('SH24 1AA');
    cy.contains('button', 'Submit').click();
    cy.contains('The postcode is in the service area').should('be.visible');
  });
    it('shows an error message for postcodes that do not exist', () => {
    cy.get('input').clear().type('S1 1AX');
    cy.contains('button', 'Submit').click();
    cy.contains(/Postcode not found/, { timeout: 10_000 }).should('be.visible'); // timeout required due to react-query's 3 retries
  });
});
