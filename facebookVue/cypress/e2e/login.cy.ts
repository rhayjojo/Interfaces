describe('login component test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should show an error message for invalid credentials', () => {

        cy.get('input[name="firstName"]').type('InvalidUser');
        cy.get('input[name="password"]').type('WrongPassword@');

        cy.get('#login-form').submit();
        cy.contains('Wrong firstName or password!')
    });

    it.only('should log in a user successfully with valid data', () => {
        cy.get('input[name="firstName"]').type('jojo');
        cy.get('input[name="lastName"]').type('gangoua');
        cy.get('input[name="email"]').type('jojo.gangoua@example.com');
        cy.get('input[name="password"]').type('P@ssw0rd!');
        cy.get('input[name="confirmPassword"]').type('P@ssw0rd!');

        cy.get('#register-form').submit();
        cy.url().should('include', '/login', );

        cy.window().then((window) => {
            const user = JSON.parse(window.localStorage.getItem('user'));
            expect(user).to.have.property('firstName', 'jojo');
            expect(user).to.have.property('lastName', 'gangoua');
            expect(user).to.have.property('email', 'jojo.gangoua@example.com');
        });
        cy.url('/login');
        cy.get('[data-test="input-username"]').type('jojo');
        cy.get('[data-test="input-password"]').type('P@ssw0rd!');


        cy.get('[data-test="submit-login"]').click();
        cy.url().should('include', 'http://localhost:5173/home', { timeout: 10000 });
    });

    it('should toggle password visibility', () => {

        const password = 'P@ssw0rd!';
        cy.get('input[name="password"]').type(password);

        cy.get('input[name="password"]').should('have.attr', 'type', 'password');

        cy.get('#toggle-password').click();

        cy.get('input[name="password"]').should('have.attr', 'type', 'text');
        cy.get('input[name="password"]').should('have.value', password);

        cy.get('#toggle-password').click();
        cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    });
});
