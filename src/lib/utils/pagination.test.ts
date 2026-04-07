import { describe, it, expect } from 'vitest'
import { parsePagination } from './pagination'

describe('parsePagination', () => {

  it('should return defaults', () => {

    const result = parsePagination({})

    expect(result.page).toBe(1)
    expect(result.limit).toBe(10)

  })

  it('should normalize string numbers', () => {

    const result = parsePagination({
      page: '3',
      limit: '20'
    })

    expect(result.page).toBe(3)
    expect(result.limit).toBe(20)

  })

})
