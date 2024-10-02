describe('login ', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('should success ', () => {
        it('when valid data is entry', () => {
            cy.get('[data-test="inputFirstname"]').type('jojo');
            cy.get('[data-test="inputLastname"]').type('gangoua');
            cy.get('input[name="email"]').type('jojo.gangoua@example.com');
            cy.get('[data-test="inputPassWord"]').type('P@ssw0rd!');
            cy.get('[data-test="inputConfirmPassWord"]').type('P@ssw0rd!');

            cy.get('[data-test="formRegister"]').submit();
            cy.url().should('include', '/login', );

            cy.window().then((window) => {
                const user = JSON.parse(window.localStorage.getItem('user'));
                expect(user).to.have.property('firstName', 'jojo');
                expect(user).to.have.property('lastName', 'gangoua');
                expect(user).to.have.property('email', 'jojo.gangoua@example.com');
            });
            cy.url('/login');
            cy.get('[data-test="inputFirstname"]').type('jojo');
            cy.get('[data-test="inputPassWord"]').type('P@ssw0rd!');


            cy.get('[data-test="submit-login"]').click();
            cy.url().should('include', 'http://localhost:5173/home', { timeout: 10000 });
        });

        it('should log in a user successfully with valid data', () => {
            cy.get('[data-test="inputFirstname"]').type('jojo');
            cy.get('[data-test="inputLastname"]').type('gangoua');
            cy.get('input[name="email"]').type('jojo.gangoua@example.com');
            cy.get('[data-test="inputPassWord"]').type('P@ssw0rd!');
            cy.get('[data-test="inputConfirmPassWord"]').type('P@ssw0rd!');

            cy.get('[data-test="formRegister"]').submit();
            cy.url().should('include', '/login', );

            cy.window().then((window) => {
                const user = JSON.parse(window.localStorage.getItem('user'));
                expect(user).to.have.property('firstName', 'jojo');
                expect(user).to.have.property('lastName', 'gangoua');
                expect(user).to.have.property('email', 'jojo.gangoua@example.com');
            });
            cy.url('/login');
            cy.get('[data-test="inputFirstname"]').type('jojo');
            cy.get('[data-test="inputPassWord"]').type('P@ssw0rd!');



            cy.get('[data-test="submit-login"]').click();
            cy.url().should('include', 'http://localhost:5173/home', { timeout: 10000 });
        });

    })

    describe('should fail', () =>{
        beforeEach(() => {
            cy.visit('/login');
        });
        it('should show an error message for invalid credentials', () => {

            cy.get('[data-test="inputFirstname"]').type('InvalidUser');
            cy.get('[data-test="inputPassWord"]').type('WrongPassword@');

            cy.get('[data-test="loginForm"]').submit();
            cy.get('[data-test="errormessage"]').should('contain.text','Wrong firstname or password!')
        });
    })

});
