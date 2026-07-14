class SharedContext {
  private static instance: SharedContext
  private _petId: number | null = null
  private _petName: string | null = null

  private constructor() {}

  static getInstance(): SharedContext {
    if (!SharedContext.instance) {
      SharedContext.instance = new SharedContext()
    }
    return SharedContext.instance
  }

  get petId(): number {
    if (this._petId === null) {
      throw new Error('petId is not set. Ensure POST /pet was executed first.')
    }
    return this._petId
  }

  set petId(id: number) {
    this._petId = id
  }

  get petName(): string | null {
    return this._petName
  }

  set petName(name: string) {
    this._petName = name
  }

  reset(): void {
    this._petId = null
    this._petName = null
  }
}

export default SharedContext
