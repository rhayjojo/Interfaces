// https://on.cypress.io/api

describe('Register Component Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  // it('should display validation errors when form is incomplete', () => {
  //
  //
  //
  //
  //   cy.contains('First name is required');
  //   cy.contains('Last name is required');
  //   cy.contains('Email is required');
  //   cy.contains('Password is required');
  //   cy.contains('Please confirm your password');
  //
  //
  // });

  it('should display validation errors when form is incomplete', () => {
    cy.get('input[name="firstName"]').type(" ");
    cy.get('input[name="lastName"]').type('gangoua');
    cy.get('input[name="email"]').type('jojo.gangoua@example.com');
    cy.get('input[name="password"]').type('P@ssw0rd!');
    cy.get('input[name="confirmPassword"]').type('P@ssw0rd!');

    cy.get('form').submit();
    cy.get("[data-test='firstName']").should('have.text', "First name is required")
  });


  it('should show an error if passwords do not match', () => {

    cy.get('input[name="password"]').type('P@ssw0rd!');
    cy.get('input[name="confirmPassword"]').type('DifferentPassword!');


    cy.get('#register-form').submit();


    cy.contains('Passwords do not match');
  });

  it('should register a user successfully with valid data', () => {
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