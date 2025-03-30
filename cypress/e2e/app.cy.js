describe('Blackjack Game', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('starts a new game and displays initial hands', () => {
		cy.contains('Start Game').click();

		cy.contains('Player').parent().should('have.length', 2);
		cy.contains('Dealer').parent().should('have.length', 2);

		cy.contains('Score:').should('exist');
	});

	it('plays a full round (hit + stand)', () => {
		cy.contains('Start Game').click();

		cy.contains('Hit').click();
		cy.contains('Hit').click();

		cy.contains('Stand').click();

		cy.contains(/Winner:/).should('exist');
	});

	it('can reset the game', () => {
		cy.contains('Start Game').click();
		cy.contains('Reset').click();

		cy.contains('Player').parent().find('.bg-green-800').should('have.length', 0);
		cy.contains('Dealer').parent().find('.bg-black').should('have.length', 0);
		cy.contains('Status: waiting').should('exist');
	});
});
