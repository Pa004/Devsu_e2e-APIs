class CheckoutStepTwoPage {
  private readonly cartContents = '[data-test="cart-contents-container"]'
  private readonly cartItem = '[data-test="inventory-item"]'
  private readonly cartItemName = '[data-test="inventory-item-name"]'
  private readonly cartItemPrice = '[data-test="inventory-item-price"]'
  private readonly cartItemDesc = '[data-test="inventory-item-desc"]'
  private readonly itemTotal = '[data-test="subtotal-label"]'
  private readonly taxLabel = '[data-test="tax-label"]'
  private readonly totalLabel = '[data-test="total-label"]'
  private readonly finishButton = '[data-test="finish"]'
  private readonly cancelButton = '[data-test="cancel"]'
  private readonly title = '[data-test="title"]'

  verifyPageLoaded(): void {
    cy.get(this.title).should('have.text', 'Checkout: Overview')
    cy.get(this.cartContents).should('be.visible')
    cy.url().should('include', '/checkout-step-two.html')
  }

  verifyProductCount(expectedCount: number): void {
    cy.get(this.cartItem).should('have.length', expectedCount)
  }

  verifyProductInOverview(productName: string): void {
    cy.get(this.cartItem)
      .contains(this.cartItemName, productName)
      .should('be.visible')
  }

  verifyProductPrice(productName: string, expectedPrice: string): void {
    cy.get(this.cartItem)
      .contains(this.cartItemName, productName)
      .parents(this.cartItem)
      .find(this.cartItemPrice)
      .should('have.text', expectedPrice)
  }

  verifyItemTotal(expectedTotal: string): void {
    cy.get(this.itemTotal).should('contain', expectedTotal)
  }

  verifyTaxVisible(): void {
    cy.get(this.taxLabel).should('be.visible')
  }

  verifyGrandTotalVisible(): void {
    cy.get(this.totalLabel).should('be.visible')
  }

  verifyPaymentInformation(): void {
    cy.contains('Payment Information').should('be.visible')
    cy.contains('Shipping Information').should('be.visible')
    cy.contains('Price Total').should('be.visible')
  }

  finish(): void {
    cy.get(this.finishButton)
      .should('be.visible')
      .click()
  }

  cancel(): void {
    cy.get(this.cancelButton)
      .should('be.visible')
      .click()
  }
}

export default CheckoutStepTwoPage
