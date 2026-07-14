import LoginPage from '../pages/LoginPage'

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      loginAs(username: string, password: string): Chainable<void>
      addFixtureProducts(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.fixture('users').then((users) => {
    const loginPage = new LoginPage()
    loginPage.login(users.standard.username, users.standard.password)
    loginPage.verifyLoginSuccess()
  })
})

Cypress.Commands.add('loginAs', (username: string, password: string) => {
  const loginPage = new LoginPage()
  loginPage.login(username, password)
  loginPage.verifyLoginSuccess()
})
