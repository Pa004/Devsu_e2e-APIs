class CheckoutCompletePage {
  private readonly completeHeader = '[data-test="complete-header"]'
  private readonly completeText = '[data-test="complete-text"]'
  private readonly backHomeButton = '[data-test="back-to-products"]'
  private readonly title = '[data-test="title"]'
  private readonly ponchoImage = '.poncho_imagename_formalhost'

  verifyPageLoaded(): void {
    cy.get(this.title).should('have.text', 'Checkout: Complete!')
    cy.url().should('include', '/checkout-complete.html')
  }

  verifyThankYouMessage(): void {
    cy.get(this.completeHeader)
      .should('be.visible')
      .and('have.text', 'Thank you for your order!')
  }

  verifyOrderDispatchedMessage(): void {
    cy.get(this.completeText)
      .should('be.visible')
      .and('contain', 'Your order has been dispatched')
  }

  verifySuccessImageVisible(): void {
    cy.get(this.ponchoImage).should('be.visible')
  }

  backToProducts(): void {
    cy.get(this.backHomeButton)
      .should('be.visible')
      .click()
  }
}

export default CheckoutCompletePage
