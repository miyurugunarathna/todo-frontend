describe('Login test', () => {
    it('01. User redirect to todo page after successfull login', () => {
        cy.visit('http://localhost:3000');
        cy.get('input[name="email"]').type('miyurupriyawadan@gmail.com');
        cy.get('input[name="password"]').type('12345');
        cy.get('button[id="signIn"]').click();
        cy.location('pathname').should('eq', '/todo');
    });

    it('02. User get "Incorect password" message when provided password was incorect', () => {
        cy.visit('http://localhost:3000');
        cy.get('input[name="email"]').type('miyurupriyawadan@gmail.com');
        cy.get('input[name="password"]').type('iamincorect');
        cy.get('button[id="signIn"]').click();
        cy.get('p').should('contain', 'Incorrect password');
    });

    it('03. User get "User does not exist" message when provided email was incorect', () => {
        cy.visit('http://localhost:3000');
        cy.get('input[name="email"]').type('yakek@gmail.com');
        cy.get('input[name="password"]').type('12345');
        cy.get('button[id="signIn"]').click();
        cy.get('p').should('contain', 'User does not exist');
    });
});