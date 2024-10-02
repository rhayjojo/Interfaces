describe('forget password', () =>{
    beforeEach(() =>{
        cy.visit('/login')
    })

    it('should navigate to the forgetPassword page when the forgetPassword link is clicked', ()=>{
        cy.get('[data-test="forgetPassWord"]').click()
        cy.url().should('include', '/forgetPassWord')
    })
})