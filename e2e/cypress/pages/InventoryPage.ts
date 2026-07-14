class InventoryPage {
  private readonly inventoryContainer = '[data-test="inventory-container"]'
  private readonly inventoryItem = '[data-test="inventory-item"]'
  private readonly cartLink = '[data-test="shopping-cart-link"]'
  private readonly cartBadge = '[data-test="shopping-cart-badge"]'
  private readonly title = '[data-test="title"]'
  private readonly sortDropdown = '[data-test="product-sort-container"]'

  private addToCartButton(productId: string): string {
    return `[data-test="add-to-cart-${productId}"]`
  }

  private removeButton(productId: string): string {
    return `[data-test="remove-${productId}"]`
  }

  verifyPageLoaded(): void {
    cy.get(this.inventoryContainer).should('be.visible')
    cy.get(this.title).should('have.text', 'Products')
    cy.url().should('include', '/inventory.html')
  }

  getProductCount(): Cypress.Chainable<number> {
    return cy.get(this.inventoryItem).its('length')
  }

  addProductToCart(productId: string): void {
    cy.get(this.addToCartButton(productId))
      .should('be.visible')
      .click()
    cy.get(this.removeButton(productId)).should('be.visible')
  }

  removeProductFromCart(productId: string): void {
    cy.get(this.removeButton(productId))
      .should('be.visible')
      .click()
    cy.get(this.addToCartButton(productId)).should('be.visible')
  }

  goToCart(): void {
    cy.get(this.cartLink).click()
  }

  getCartBadgeCount(): Cypress.Chainable<string> {
    return cy.get(this.cartBadge).invoke('text')
  }

  verifyCartBadgeCount(expectedCount: number): void {
    cy.get(this.cartBadge).should('have.text', expectedCount.toString())
  }

  verifyCartBadgeNotExist(): void {
    cy.get(this.cartBadge).should('not.exist')
  }
}

export default InventoryPage
