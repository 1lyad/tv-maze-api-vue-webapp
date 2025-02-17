import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ShowDetails from '@/views/ShowDetails.vue'
import BackButton from '@/components/ui/BackButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import ShowHeader from '@/components/show/ShowHeader.vue'
import ShowInfo from '@/components/show/ShowInfo.vue'
import ShowSeasonsAndEpisodes from '@/components/show/ShowSeasonsAndEpisodes.vue'
import ShowCast from '@/components/show/ShowCast.vue'
import ShowCrew from '@/components/show/ShowCrew.vue'

const fakeShowDetails = {
  id: 1,
  name: 'Fake Show',
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
    name: 'Fake Network',
    country: { name: 'Fake Country', code: 'FC', timezone: 'UTC' },
    officialSite: '',
  },
  webChannel: null,
  externals: { tvrage: 0, thetvdb: 0, imdb: '' },
  image: { medium: 'fake.jpg', original: 'fake.jpg' },
  summary: 'Fake summary',
  updated: 0,
  _links: {},
  averageRuntime: 60,
  ended: null,
  dvdCountry: null,
  _embedded: {
    episodes: [{ id: 101, season: 1, number: 1, name: 'Episode 1' }],
    cast: [
      {
        person: {
          id: 201,
          name: 'Actor One',
          image: { medium: 'actor1.jpg', original: 'actor1.jpg' },
        },
        character: { name: 'Character One' },
      },
    ],
    crew: [
      {
        person: {
          id: 301,
          name: 'Crew One',
          image: { medium: 'crew1.jpg', original: 'crew1.jpg' },
        },
        type: 'Director',
      },
    ],
  },
}

const mockedShowDetailsInstance = {
  showId: ref(1),
  showDetails: ref(fakeShowDetails),
  loading: ref(false),
  error: ref(''),
  loadShowDetails: vi.fn(),
}

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      back: vi.fn(),
    })),
    useRoute: vi.fn(() => ({
      params: { id: '1' },
    })),
  }
})

vi.mock('@/composables/useShowDetails', () => ({
  useShowDetails: vi.fn(() => mockedShowDetailsInstance),
}))

describe('ShowDetails.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    mockedShowDetailsInstance.loading.value = false
    mockedShowDetailsInstance.error.value = ''
    mockedShowDetailsInstance.showDetails.value = fakeShowDetails
    mockedShowDetailsInstance.loadShowDetails.mockClear()

    wrapper = mount(ShowDetails)
  })

  it('renders child components when showDetails are available', () => {
    expect(wrapper.findComponent(BackButton).exists()).toBe(true)
    expect(wrapper.findComponent(ShowHeader).exists()).toBe(true)
    expect(wrapper.findComponent(ShowInfo).exists()).toBe(true)
    expect(wrapper.findComponent(ShowSeasonsAndEpisodes).exists()).toBe(true)
    expect(wrapper.findComponent(ShowCast).exists()).toBe(true)
    expect(wrapper.findComponent(ShowCrew).exists()).toBe(true)
  })

  it('renders ErrorMessage when error is set', async () => {
    mockedShowDetailsInstance.error.value = 'Test error'
    wrapper = mount(ShowDetails)
    await wrapper.vm.$nextTick()
    const errorMsg = wrapper.findComponent(ErrorMessage)
    expect(errorMsg.exists()).toBe(true)
    expect(errorMsg.text()).toContain('Test error')
  })

  it('renders loading indicator when loading is true', async () => {
    mockedShowDetailsInstance.loading.value = true
    wrapper = mount(ShowDetails)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.text-center').exists()).toBe(true)
  })
})
