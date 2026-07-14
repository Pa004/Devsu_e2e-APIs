class CheckoutStepOnePage {
  private readonly firstNameInput = '[data-test="firstName"]'
  private readonly lastNameInput = '[data-test="lastName"]'
  private readonly postalCodeInput = '[data-test="postalCode"]'
  private readonly continueButton = '[data-test="continue"]'
  private readonly cancelButton = '[data-test="cancel"]'
  private readonly errorMessage = '[data-test="error"]'
  private readonly title = '[data-test="title"]'

  verifyPageLoaded(): void {
    cy.get(this.title).should('have.text', 'Checkout: Your Information')
    cy.url().should('include', '/checkout-step-one.html')
  }

  fillFirstName(firstName: string): void {
    cy.get(this.firstNameInput).clear()
    cy.get(this.firstNameInput).type(firstName)
    cy.get(this.firstNameInput).should('have.value', firstName)
  }

  fillLastName(lastName: string): void {
    cy.get(this.lastNameInput).clear()
    cy.get(this.lastNameInput).type(lastName)
    cy.get(this.lastNameInput).should('have.value', lastName)
  }

  fillPostalCode(postalCode: string): void {
    cy.get(this.postalCodeInput).clear()
    cy.get(this.postalCodeInput).type(postalCode)
    cy.get(this.postalCodeInput).should('have.value', postalCode)
  }

  fillCheckoutForm(data: { firstName: string; lastName: string; postalCode: string }): void {
    this.fillFirstName(data.firstName)
    this.fillLastName(data.lastName)
    this.fillPostalCode(data.postalCode)
  }

  continue(): void {
    cy.get(this.continueButton).click()
  }

  cancel(): void {
    cy.get(this.cancelButton).click()
  }

  verifyValidationError(expectedMessage: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain', expectedMessage)
  }
}

export default CheckoutStepOnePage
