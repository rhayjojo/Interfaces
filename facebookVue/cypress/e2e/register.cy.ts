// https://on.cypress.io/api

describe('Register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });


  it('should register a user successfully with valid data', () => {
    cy.get('[data-test="inputFirstname"]').type("jojo");
    cy.get('[data-test="inputLastname"]').type('gangoua');
    cy.get('input[name="email"]').type('jojo.gangoua@example.com');
    cy.get('[data-test="inputPassWord"]').type('P@ssw0rd!');
    cy.get('[data-test="inputConfirmPassWord"]').type('P@ssw0rd!');



    cy.get('form').submit();
    cy.url().should('include', '/login', );

    cy.window().then((window) => {
      const user = JSON.parse(window.localStorage.getItem('user'));
      expect(user).to.have.property('firstName', 'jojo');
      expect(user).to.have.property('lastName', 'gangoua');
      expect(user).to.have.property('email', 'jojo.gangoua@example.com');
    });
  });


  it('should navigate to the login page when the login link is clicked', () => {

    cy.get('#login-link').click();

    cy.url().should('include', '/login');
  });

  it('should toggle password visibility', () => {

    const password = 'P@ssw0rd!';
    cy.get('#password').type(password);

    cy.get('#password').should('have.attr', 'type', 'password');

    cy.get('#toggle-password').click();

    cy.get('#password').should('have.attr', 'type', 'text');

    cy.get('#password').should('have.value', password);

    cy.get('#toggle-password').click();

    cy.get('#password').should('have.attr', 'type', 'password');
  });
});