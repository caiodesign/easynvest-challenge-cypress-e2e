import "cypress-localstorage-commands"

const user = {
    name: 'Caio Oliveira',
    email: 'colive.dev@gmail.com',
    cpf: '71976651085',
    phone: '11969132927'
}

const apiMockResponse = [{...user, email: 'ma@ma.com'}]

describe('The register Page', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.intercept('https://private-21e8de-rafaellucio.apiary-mock.com/users', apiMockResponse ).as('getUsers')
        cy.restoreLocalStorage();
        cy.visit('/register.html')
        cy.get('input[name=name]').type(user.name)
        cy.get('input[name=email]').type(user.email)
        cy.get('input[name=cpf]').type(user.cpf)
        cy.get('input[name=phone]').type(user.phone)
    })

    it('should use the FORM to register a USER', () => {
        cy.wait('@getUsers').then(() => {
            cy.get('button').click()

            cy.contains('#notify', 'Usuario cadastrado com sucesso! :)')

            cy.wait(500);

            cy.getLocalStorage('users').should('equal', JSON.stringify([user]))

        });
    })

    it('should prevent the user to proceed case E-MAIL already registered', () => {
        cy.wait('@getUsers').then(() => {
            cy.get('button').click()

            cy.wait(500);

            cy.on('uncaught:exception', (err, runnable) => {
                expect(err.message).to.include('User already exists!')
                
                return false
              })

            cy.get('button').click()

            cy.contains('#notify', 'Ocorreu algum problema... Verifique se o e-mail já não está sendo utilizado.')

            cy.getLocalStorage('users').should('equal', JSON.stringify([user]))

        });
    })

    it('should prevent the USER to proceed case the name has less than 3 characters', () => {
        const element = 'input[name=name]'

        cy.get(element).clear()
        cy.get(element).type('ca')

        cy.get('button').click()
        cy.get(element).parent().should('have.class', 'error');

        cy.get(element).clear()
        cy.get(element).type('c')

        cy.get('button').click()
        cy.get(element).parent().should('have.class', 'error');
    })

    it('should prevent the USER to proceed case invalid e-mail', () => {
        const element = 'input[name=email]'

        cy.get(element).clear()
        cy.get(element).type('caio.com')

        cy.get('button').click()
        cy.get(element).parent().should('have.class', 'error');
    })

    it('should prevent the USER to proceed case invalid cpf', () => {
        const element = 'input[name=cpf]'

        const invalidNumbers = [
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999'
        ]

        invalidNumbers.map((number) => {
            cy.get(element).clear()
            cy.get(element).type(number)

            cy.get('button').click()
            cy.get(element).parent().should('have.class', 'error');
        })

    })

    it('should prevent the USER to proceed case invalid phone number', () => {
        const element = 'input[name=phone]'

        const invalidNumbers = [
            '1',
            '11',
            '111',
            '1111',
            '11111',
            '111111',
            '2222222',
            '33333333',
        ]

        invalidNumbers.map((number) => {
            cy.get(element).clear()
            cy.get(element).type(number)

            cy.get('button').click()
            cy.get(element).parent().should('have.class', 'error');
        })
    })

    it('should FETCH users API and inject data into LocalStorage with USERS key', () => {
        cy.wait('@getUsers').then(() => {
            cy.getLocalStorage('users').should('equal', JSON.stringify(apiMockResponse))
        });
    })
})