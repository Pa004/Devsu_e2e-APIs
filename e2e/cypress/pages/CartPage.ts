class CartPage {
  private readonly cartList = '[data-test="cart-list"]'
  private readonly cartItem = '[data-test="inventory-item"]'
  private readonly cartItemName = '[data-test="inventory-item-name"]'
  private readonly cartItemPrice = '[data-test="inventory-item-price"]'
  private readonly cartItemDesc = '[data-test="inventory-item-desc"]'
  private readonly cartItemQty = '[data-test="item-quantity"]'
  private readonly continueShoppingButton = '[data-test="continue-shopping"]'
  private readonly checkoutButton = '[data-test="checkout"]'
  private readonly title = '[data-test="title"]'

  verifyPageLoaded(): void {
    cy.get(this.cartList).should('be.visible')
    cy.get(this.title).should('have.text', 'Your Cart')
    cy.url().should('include', '/cart.html')
  }

  verifyProductCount(expectedCount: number): void {
    cy.get(this.cartItem).should('have.length', expectedCount)
  }

  verifyProductInCart(productName: string): void {
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

  verifyCartIsEmpty(): void {
    cy.get(this.cartItem).should('not.exist')
  }

  checkout(): void {
    cy.get(this.checkoutButton)
      .should('be.visible')
      .click()
  }

  continueShopping(): void {
    cy.get(this.continueShoppingButton)
      .should('be.visible')
      .click()
  }

  removeProduct(productName: string): void {
    cy.get(this.cartItem)
      .contains(this.cartItemName, productName)
      .parents(this.cartItem)
      .find('button')
      .click()
  }
}

export default CartPage
