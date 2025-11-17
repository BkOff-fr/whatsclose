/**
 * Common TypeScript type definitions for WhatsClose
 */

export interface Place {
  id: string
  name: string
  description: string
  category: string
  location: {
    lat: number
    lng: number
    address: string
  }
  rating?: number
  imageUrl?: string
  distance?: number
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: {
    lat: number
    lng: number
    address: string
  }
  category: string
  imageUrl?: string
  price?: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  preferences?: {
    categories: string[]
    maxDistance: number
  }
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export interface Location {
  lat: number
  lng: number
  address?: string
  city?: string
  country?: string
}

export interface SearchFilters {
  category?: string
  distance?: number
  rating?: number
  price?: {
    min: number
    max: number
  }
  date?: {
    start: Date
    end: Date
  }
}

export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
  status: number
}
