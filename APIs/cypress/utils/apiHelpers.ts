import type { Pet, JsonShape } from '../support/types'

export function validatePetResponse(body: Pet, expected: Partial<Pet>): void {
  if (expected.id !== undefined) {
    expect(body.id).to.eq(expected.id)
  }
  if (expected.name !== undefined) {
    expect(body.name).to.eq(expected.name)
  }
  if (expected.status !== undefined) {
    expect(body.status).to.eq(expected.status)
  }
  if (expected.category !== undefined) {
    expect(body.category).to.deep.include(expected.category)
  }
}

export function containsPetWithId(pets: Pet[], petId: number): boolean {
  return pets.some((pet) => pet.id === petId)
}

export function validateShape(body: object, shape: JsonShape, path = ''): void {
  const record = body as Record<string, unknown>
  for (const [key, expectedType] of Object.entries(shape)) {
    const value = record[key]
    const currentPath = path ? `${path}.${key}` : key

    if (value === null || value === undefined) {
      continue
    }
    if (typeof expectedType === 'string') {
      switch (expectedType) {
        case 'array':
          expect(Array.isArray(value), `"${currentPath}" should be an array`).to.be.true
          break
        case 'object':
          expect(value, `"${currentPath}" should be an object`).to.be.an('object')
          break
        default:
          expect(typeof value, `"${currentPath}" should be a ${expectedType}`).to.eq(expectedType)
      }
    } else if (typeof expectedType === 'object') {
      expect(value, `"${currentPath}" should be an object`).to.be.an('object')
      validateShape(value as object, expectedType as JsonShape, currentPath)
    }
  }
}
