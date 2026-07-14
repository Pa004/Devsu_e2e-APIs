import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'
import CartPage from '../pages/CartPage'
import CheckoutStepOnePage from '../pages/CheckoutStepOnePage'
import CheckoutStepTwoPage from '../pages/CheckoutStepTwoPage'
import CheckoutCompletePage from '../pages/CheckoutCompletePage'

describe('SauceDemo - Complete Purchase Flow', () => {
  const loginPage = new LoginPage()
  const inventoryPage = new InventoryPage()
  const cartPage = new CartPage()
  const checkoutStepOnePage = new CheckoutStepOnePage()
  const checkoutStepTwoPage = new CheckoutStepTwoPage()
  const checkoutCompletePage = new CheckoutCompletePage()

  beforeEach(() => {
    cy.login()
  })

  it('should complete the full purchase flow successfully', () => {
    // ── Step 1: Verify inventory page ──────────────────────────────
    inventoryPage.verifyPageLoaded()

    // ── Step 2: Add two products to the cart ───────────────────────
    cy.fixture('products').then((products) => {
      inventoryPage.addProductToCart(products.productOne.id)
      inventoryPage.verifyCartBadgeCount(1)

      inventoryPage.addProductToCart(products.productTwo.id)
      inventoryPage.verifyCartBadgeCount(2)
    })

    // ── Step 3: Navigate and validate the cart ─────────────────────
    inventoryPage.goToCart()
    cartPage.verifyPageLoaded()

    cy.fixture('products').then((products) => {
      cartPage.verifyProductCount(2)
      cartPage.verifyProductInCart(products.productOne.name)
      cartPage.verifyProductInCart(products.productTwo.name)
    })

    // ── Step 4: Proceed to checkout step one ───────────────────────
    cartPage.checkout()
    checkoutStepOnePage.verifyPageLoaded()

    // ── Step 5: Fill checkout form ─────────────────────────────────
    cy.fixture('checkout').then((checkoutData) => {
      checkoutStepOnePage.fillCheckoutForm(checkoutData.validUser)
    })
    checkoutStepOnePage.continue()

    // ── Step 6: Verify order overview ──────────────────────────────
    checkoutStepTwoPage.verifyPageLoaded()
    cy.fixture('products').then((products) => {
      checkoutStepTwoPage.verifyProductCount(2)
      checkoutStepTwoPage.verifyProductInOverview(products.productOne.name)
      checkoutStepTwoPage.verifyProductInOverview(products.productTwo.name)
    })
    checkoutStepTwoPage.verifyPaymentInformation()
    checkoutStepTwoPage.verifyItemTotal('$39.98')
    checkoutStepTwoPage.verifyTaxVisible()
    checkoutStepTwoPage.verifyGrandTotalVisible()

    // ── Step 7: Complete the purchase ──────────────────────────────
    checkoutStepTwoPage.finish()

    // ── Step 8: Verify completion and success message ──────────────
    checkoutCompletePage.verifyPageLoaded()
    checkoutCompletePage.verifyThankYouMessage()
    checkoutCompletePage.verifyOrderDispatchedMessage()
    checkoutCompletePage.verifySuccessImageVisible()
  })
})
