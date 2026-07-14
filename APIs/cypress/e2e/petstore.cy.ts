import type { Pet, JsonShape } from '../support/types'
import SharedContext from '../utils/sharedContext'
import { validatePetResponse, containsPetWithId, validateShape } from '../utils/apiHelpers'

describe('PetStore API — Complete Pet Lifecycle', () => {
  let petPayload: Pet
  let updatedName: string
  let updatedStatus: Pet['status']
  let petShape: JsonShape
  let petArrayItemShape: JsonShape

  before(() => {
    cy.fixture('petstore').then((data) => {
      petPayload = data.newPet
      updatedName = data.updatedPet.name
      updatedStatus = data.updatedPet.status
      petShape = data.expectedShape
      petArrayItemShape = data.expectedShapeArrayItem
    })
    SharedContext.getInstance().reset()
  })

  beforeEach(() => {
    try {
      cy.log(`Pet ID in context: ${SharedContext.getInstance().petId}`)
    } catch {
      cy.log('Pet ID not yet set')
    }
  })

  after(() => {
    cy.log('PetStore API flow completed')
    SharedContext.getInstance().reset()
  })

  it('POST /pet — Create a new pet', () => {
    cy.addPet(petPayload).then((response) => {
      expect(response.status).to.eq(200)

      const body = response.body
      validateShape(body, petShape)
      expect(body).to.have.property('id').that.is.a('number')

      const petId = body.id
      expect(petId).to.be.greaterThan(0)

      SharedContext.getInstance().petId = petId
      SharedContext.getInstance().petName = body.name

      validatePetResponse(body, {
        name: petPayload.name,
        status: petPayload.status,
        category: petPayload.category,
      })
    })
  })

  it('GET /pet/{id} — Get pet by ID', () => {
    const petId = SharedContext.getInstance().petId

    cy.request<Pet>(`/pet/${petId}`).then((response) => {
      expect(response.status).to.eq(200)

      const body = response.body
      validateShape(body, petShape)

      validatePetResponse(body, {
        id: petId,
        name: SharedContext.getInstance().petName ?? undefined,
        status: petPayload.status,
        category: petPayload.category,
      })
    })
  })

  it('PUT /pet — Update pet name and status', () => {
    const petId = SharedContext.getInstance().petId

    const updatedPet: Pet = {
      ...petPayload,
      id: petId,
      name: updatedName,
      status: updatedStatus,
    }

    cy.request<Pet>({
      method: 'PUT',
      url: '/pet',
      body: updatedPet,
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      expect(response.status).to.eq(200)

      const body = response.body
      validateShape(body, petShape)

      validatePetResponse(body, {
        id: petId,
        name: updatedName,
        status: updatedStatus,
      })
      expect(body.name).to.not.eq(petPayload.name)

      SharedContext.getInstance().petName = body.name
    })
  })

  it('GET /pet/findByStatus — Verify pet is in sold list', () => {
    const petId = SharedContext.getInstance().petId

    cy.request<Pet[]>('/pet/findByStatus?status=sold').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array').that.is.not.empty

      response.body.forEach((pet) => validateShape(pet, petArrayItemShape))

      const found = containsPetWithId(response.body, petId)
      expect(found).to.be.true
    })
  })
})
