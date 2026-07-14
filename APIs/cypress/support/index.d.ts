import type { Pet } from './types'

declare global {
  namespace Cypress {
    interface Chainable {
      addPet(petData: Pet): Chainable<Response<Pet>>
    }
  }
}

export {}
