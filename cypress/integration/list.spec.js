import "cypress-localstorage-commands"

const user = {
    name: 'Caio Oliveira',
    email: 'colive.dev@gmail.com',
    cpf: '71976651085',
    phone: '11969132927'
}

const apiMockResponse = [{...user, name: 'mock1'}, {...user, email: 'mock2@gmail.com'}]

describe('The list Page', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.intercept('https://private-21e8de-rafaellucio.apiary-mock.com/users', apiMockResponse ).as('getUsers')
        cy.visit('/list.html');
    })


    it('should FETCH users API and inject data into LocalStorage with USERS key', () => {
        cy.wait('@getUsers').then(() => {
            cy.getLocalStorage('users').should('equal', JSON.stringify(apiMockResponse))
        });
    })

    it('should remove a user case REMOVE button was clicked', () => {
        cy.wait(1000);
        cy.get('.__user:first img').click();

        
        cy.get('.user:first').should('not.exist');
        cy.getLocalStorage('users').should('equal', JSON.stringify([apiMockResponse[1]]))
        
        cy.wait(1000);
        cy.get('.__user:last img').click();

        cy.get('.user:last').should('not.exist');
        cy.getLocalStorage('users').should('equal', JSON.stringify([]))
    })
})