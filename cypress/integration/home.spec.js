describe('The Home Page', () => {
  it('successfully loads and show navbar', () => {
    cy.visit('/')
    cy.get('nav a:first').should('have.text', 'Cadastro')
    cy.get('nav a:last').should('have.text', 'Lista de usuários')
  })
})