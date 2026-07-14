# SauceDemo E2E Test Automation

[![Cypress](https://img.shields.io/badge/cypress-13.15.0-brightgreen)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/typescript-5.6.0-blue)](https://www.typescriptlang.org/)
[![Mochawesome](https://img.shields.io/badge/reporter-mochawesome-orange)](https://www.npmjs.com/package/cypress-mochawesome-reporter)

Automated E2E testing suite for [SauceDemo](https://www.saucedemo.com) using Cypress with TypeScript, following the Page Object Model pattern and industry best practices.

## Requirements

- [Node.js](https://nodejs.org/) >= 18.x
- npm >= 9.x
- A browser (Chrome, Edge, Electron, or Firefox)

## Installation

```bash
git clone <repository-url>
cd saucedemo-e2e
npm install
```

## Execution

### Open Cypress Test Runner (interactive mode)

```bash
npm run cy:open
```

Select **E2E Testing**, then choose a browser, and click on `checkout.cy.ts` to run.

### Run all tests headlessly (CI mode)

```bash
npm run cy:run
```

### Run in a specific browser

```bash
npm run cy:run:chrome
```

### Run headed (visible browser)

```bash
npm run cy:run:headed
```

### Run headless

```bash
npm run cy:run:headless
```

## Report Generation

HTML reports are automatically generated after each run using [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter).

Reports are saved to the `reports/` directory:

```bash
# Open the latest report (Windows)
npm run report:open

# Clean generated artifacts
npm run clean
```

The report includes:
- Test pass/fail summary with charts
- Screenshots embedded on failure
- Test duration and metadata
- Collapsible test steps

## Project Structure

```
saucedemo-e2e/
│
├── cypress/
│   ├── e2e/
│   │   └── checkout.cy.ts          # Main test spec - complete purchase flow
│   │
│   ├── fixtures/
│   │   ├── users.json              # User credentials for all account types
│   │   ├── products.json           # Product IDs, names, and prices
│   │   └── checkout.json           # Checkout form test data
│   │
│   ├── pages/
│   │   ├── LoginPage.ts            # Login page actions and validations
│   │   ├── InventoryPage.ts        # Product listing page
│   │   ├── CartPage.ts             # Shopping cart page
│   │   ├── CheckoutStepOnePage.ts  # Checkout information form
│   │   ├── CheckoutStepTwoPage.ts  # Order overview / summary
│   │   └── CheckoutCompletePage.ts # Order confirmation page
│   │
│   ├── support/
│   │   ├── commands.ts             # Custom Cypress commands (login, loginAs)
│   │   └── e2e.ts                  # Global imports and hooks
│   │
│   └── downloads/                  # Downloaded files (if any)
│
├── reports/                        # HTML test reports (generated)
├── screenshots/                    # Screenshots on test failure (generated)
├── videos/                         # Test execution videos (generated)
│
├── cypress.config.ts               # Cypress configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
├── .gitignore                      # Git ignore rules
├── README.md                       # This file
└── conclusions.txt                 # Technical findings and conclusions
```

## Technologies

| Technology | Purpose |
|---|---|
| [Cypress](https://www.cypress.io/) | Test runner and automation framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test code |
| [Page Object Model](https://www.selenium.dev/documentation/guidelines/page_object_models/) | Design pattern for maintainable tests |
| [Mochawesome Reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) | HTML report generation |
| [Fixtures](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Fixture-Files) | External test data management |

## Design Decisions

- **data-test selectors**: The SauceDemo application provides `data-test` attributes on all interactive elements. These are more stable than CSS classes or XPath.
- **No cy.wait()**: All waits use Cypress's built-in retry-ability via `.should()` assertions. This makes tests faster and more reliable.
- **Custom login command**: The `cy.login()` command encapsulates authentication logic, reducing duplication across specs.
- **Single Responsibility**: Each Page Object handles only the actions and validations for its page.
- **Fixture-driven data**: Test data is separated from test logic, making it easy to modify or extend.

## Contributing to the Interview Process

This project demonstrates:
1. Clean code with TypeScript types
2. Page Object Model design pattern
3. Custom commands and fixtures
4. Proper assertions and error handling
5. Professional project structure
6. HTML reporting for stakeholders
7. CI-ready configuration
