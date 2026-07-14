class LoginPage {
  private readonly usernameInput = '[data-test="username"]'
  private readonly passwordInput = '[data-test="password"]'
  private readonly loginButton = '[data-test="login-button"]'
  private readonly errorMessage = '[data-test="error"]'
  private readonly loginLogo = '.login_logo'
  private readonly botImage = '.bot_column'

  visit(): void {
    cy.visit('/')
  }

  validatePageLoaded(): void {
    cy.get(this.loginLogo).should('be.visible')
    cy.get(this.botImage).should('be.visible')
    cy.get(this.usernameInput).should('be.visible')
    cy.get(this.passwordInput).should('be.visible')
    cy.get(this.loginButton).should('be.visible')
  }

  fillUsername(username: string): void {
    cy.get(this.usernameInput).clear()
    cy.get(this.usernameInput).type(username)
    cy.get(this.usernameInput).should('have.value', username)
  }

  fillPassword(password: string): void {
    cy.get(this.passwordInput).clear()
    cy.get(this.passwordInput).type(password)
  }

  submit(): void {
    cy.get(this.loginButton).click()
  }

  login(username: string, password: string): void {
    this.visit()
    this.validatePageLoaded()
    this.fillUsername(username)
    this.fillPassword(password)
    this.submit()
  }

  verifyLoginSuccess(): void {
    cy.url().should('include', '/inventory.html')
    cy.get('[data-test="inventory-container"]').should('be.visible')
  }

  verifyLoginError(expectedMessage: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain', expectedMessage)
  }
}

export default LoginPage
