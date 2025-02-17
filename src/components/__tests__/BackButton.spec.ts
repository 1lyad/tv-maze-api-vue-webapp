import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BackButton from '@/components/ui/BackButton.vue'
import { nextTick } from 'vue'

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve))
}

const routerBack = vi.fn()
const routerPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    back: routerBack,
    push: routerPush,
  })),
}))

describe('BackButton.vue', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    Object.defineProperty(window.history, 'state', {
      value: {},
      writable: true,
      configurable: true,
    })
    await flushPromises()
    await nextTick()
  })

  it('renders the correct text', async () => {
    const text = 'Go Back Home'
    const wrapper = mount(BackButton, {
      props: { text },
    })
    await nextTick()
    expect(wrapper.text()).toContain(text)
  })

  it('calls router.back() when canGoBack is true', async () => {
    Object.defineProperty(window.history, 'state', {
      value: { back: true },
      writable: true,
      configurable: true,
    })

    const wrapper = mount(BackButton)
    await flushPromises()
    await nextTick()
    await wrapper.trigger('click')

    expect(routerBack).toHaveBeenCalled()
    expect(routerPush).not.toHaveBeenCalled()
  })

  it('calls router.push() with fallbackRoute when canGoBack is false', async () => {
    Object.defineProperty(window.history, 'state', {
      value: { back: false },
      writable: true,
      configurable: true,
    })

    const fallbackRoute = '/home'
    const wrapper = mount(BackButton, {
      props: { fallbackRoute },
    })
    await flushPromises()
    await nextTick()
    await wrapper.trigger('click')

    expect(routerPush).toHaveBeenCalledWith(fallbackRoute)
    expect(routerBack).not.toHaveBeenCalled()
  })

  it('uses the default fallbackRoute when no fallbackRoute is provided', async () => {
    Object.defineProperty(window.history, 'state', {
      value: { back: false },
      writable: true,
      configurable: true,
    })

    const wrapper = mount(BackButton)
    await flushPromises()
    await nextTick()
    await wrapper.trigger('click')

    expect(routerPush).toHaveBeenCalledWith('/')
    expect(routerBack).not.toHaveBeenCalled()
  })
})
