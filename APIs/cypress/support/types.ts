export interface Category {
  id: number
  name: string
}

export interface Tag {
  id: number
  name: string
}

export interface Pet {
  id: number
  category: Category
  name: string
  photoUrls: string[]
  tags: Tag[]
  status: 'available' | 'pending' | 'sold'
}

export interface ApiResponse {
  code: number
  type: string
  message: string
}

export type JsonPrimitive = string | number | boolean | null
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }
export type JsonShape = { [key: string]: 'string' | 'number' | 'boolean' | 'array' | 'object' | JsonShape }
