import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useShows } from '@/composables/useShows'

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve))
}

describe('useShows composable', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', async (url: string) => {
      if (url.includes('/shows?page=')) {
        return {
          ok: true,
          json: async () => {
            return [{ id: 1, name: 'Test Show', genres: [] }]
          },
        } as Response
      }

      if (url.includes('/shows/')) {
        if (url.includes('?embed[]=episodes')) {
          return {
            ok: true,
            json: async () => ({
              id: 1,
              name: 'Test Show Details',
              genres: [],
              type: 'Scripted',
              language: 'English',
              status: 'Ended',
              runtime: 60,
              premiered: '2020-01-01',
              officialSite: '',
              schedule: { time: '20:00', days: [] },
              rating: { average: 5 },
              weight: 0,
              network: {
                id: 1,
                name: 'Test Network',
                country: { name: 'Testland', code: 'TT', timezone: 'UTC' },
                officialSite: '',
              },
              webChannel: null,
              externals: { tvrage: 0, thetvdb: 0, imdb: '' },
              image: { medium: 'test.jpg', original: 'test.jpg' },
              summary: 'Test summary',
              updated: 0,
              _links: {},
              averageRuntime: 60,
              ended: null,
              dvdCountry: null,
              _embedded: {},
            }),
          } as Response
        }
      }

      if (url.includes('/search/shows?q=')) {
        return {
          ok: true,
          json: async () => {
            return [{ score: 1.0, show: { id: 2, name: 'Search Show', genres: [] } }]
          },
        } as Response
      }

      return {
        ok: false,
        status: 404,
      } as Response
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetchShows should update shows correctly', async () => {
    const { shows, loading, error, fetchShows } = useShows()
    await fetchShows(1)
    await flushPromises()
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
    expect(shows.value.length).toBeGreaterThan(0)
    expect(shows.value[0].name).toBe('Test Show')
  })

  it('fetchShowDetails should return details when successful', async () => {
    const { fetchShowDetails } = useShows()
    const details = await fetchShowDetails(1)
    expect(details).not.toBeNull()
    expect(details?.name).toBe('Test Show Details')
  })

  it('fetchShowDetails should return null on 404', async () => {
    vi.stubGlobal('fetch', async () => ({
      ok: false,
      status: 404,
    }))
    const { fetchShowDetails } = useShows()
    const details = await fetchShowDetails(9999)
    expect(details).toBeNull()
    vi.unstubAllGlobals()
  })

  it('searchShows should update searchResults correctly', async () => {
    const { searchResults, searchShows, loading, error } = useShows()
    await searchShows('Test')
    await flushPromises()
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
    expect(searchResults.value.length).toBeGreaterThan(0)
    expect(searchResults.value[0].show.name).toBe('Search Show')
  })

  it('searchShows should clear searchResults if query is empty', async () => {
    const { searchResults, searchShows } = useShows()
    await searchShows('')
    await flushPromises()
    expect(searchResults.value.length).toBe(0)
  })
})
