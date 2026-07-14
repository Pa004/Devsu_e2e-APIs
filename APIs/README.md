# PetStore API E2E Test Automation

[![Cypress](https://img.shields.io/badge/cypress-13.15.0-brightgreen)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/typescript-5.6.0-blue)](https://www.typescriptlang.org/)
[![Mochawesome](https://img.shields.io/badge/reporter-mochawesome-orange)](https://www.npmjs.com/package/cypress-mochawesome-reporter)

Automated API testing suite for [PetStore](https://petstore.swagger.io/) using Cypress with TypeScript. Tests cover the complete pet lifecycle: create, read, update, and query by status.

## Requirements

- [Node.js](https://nodejs.org/) >= 18.x
- npm >= 9.x

## Installation

```bash
cd petstore-api-e2e
npm install
```

## Execution

### Open Cypress Test Runner (interactive mode)

```bash
npm run cy:open
```

Select **E2E Testing**, then choose a browser, and click on `petstore.cy.ts`.

### Run all tests headlessly (CI mode)

```bash
npm run cy:run
```

### Run in a specific browser

```bash
npm run cy:run:chrome
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
petstore-api-e2e/
│
├── cypress/
│   ├── e2e/
│   │   └── petstore.cy.ts            # Main test spec — complete pet lifecycle
│   │
│   ├── fixtures/
│   │   └── petstore.json             # Payloads, updated data, JSON shape definitions
│   │
│   ├── support/
│   │   ├── commands.ts               # Custom Cypress commands (addPet)
│   │   ├── e2e.ts                    # Global imports
│   │   ├── types.ts                  # TypeScript interfaces (Pet, Category, Tag, etc.)
│   │   └── index.d.ts                # Cypress command type augmentation
│   │
│   ├── utils/
│   │   ├── sharedContext.ts          # Singleton — shared variables across tests
│   │   └── apiHelpers.ts             # Validation helpers (shape, response, search)
│   │
│   └── downloads/                    # Downloaded files (if any)
│
├── reports/                          # HTML test reports (generated)
├── screenshots/                      # Screenshots on test failure (generated)
├── videos/                           # Test execution videos (generated)
│
├── .github/
│   └── workflows/
│       └── petstore-api.yml          # GitHub Actions CI pipeline
│
├── cypress.config.ts                 # Cypress configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
├── .gitignore                        # Git ignore rules
├── README.md                         # This file
└── conclusions.txt                   # Technical findings and conclusions
```

## Technologies

| Technology | Purpose |
|---|---|
| [Cypress](https://www.cypress.io/) | Test runner and automation framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test code |
| [Mochawesome Reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) | HTML report generation |
| [Fixtures](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Fixture-Files) | External test data management |
| [Swagger PetStore](https://petstore.swagger.io/) | REST API under test |

## Design Decisions

- **SharedContext singleton**: Centralises state (`petId`, `petName`) across tests without global variables. Resettable between runs and type-safe.
- **Schema validation**: `validateShape()` recursively checks JSON structure types, catching API contract regressions early.
- **Validation helpers**: `validatePetResponse()` and `containsPetWithId()` eliminate duplication in assertions.
- **Custom command**: `cy.addPet()` encapsulates the POST /pet request, improving readability and reusability.
- **No cy.wait()**: All validations use Cypress's built-in retry-ability via `.should()` or direct assertions in `.then()` callbacks.
- **Fixture-driven data**: Payloads and expected shapes are externalised, making it easy to extend test coverage.

## API Flow

```
POST /pet          → Create a pet
                       ↓
GET /pet/{id}      → Verify creation
                       ↓
PUT /pet           → Update name and status
                       ↓
GET /findByStatus  → Confirm pet appears in filtered list
```
