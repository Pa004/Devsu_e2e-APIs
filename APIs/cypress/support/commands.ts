import type { Pet } from './types'

Cypress.Commands.add('addPet', (petData: Pet) => {
  cy.request<Pet>({
    method: 'POST',
    url: '/pet',
    body: petData,
    headers: { 'Content-Type': 'application/json' },
  })
})
