import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

describe('ErrorMessage.vue', () => {
  it('renders the error message and shows the retry button when showRetry is true', async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Test error message',
        showRetry: true,
      },
    })

    expect(wrapper.text()).toContain('Test error message')

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)

    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('retry')
    expect(wrapper.emitted('retry')?.length).toBe(1)
  })

  it('renders the error message and does not show the retry button when showRetry is false', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Test error message',
        showRetry: false,
      },
    })

    expect(wrapper.text()).toContain('Test error message')
    const button = wrapper.find('button')
    expect(button.exists()).toBe(false)
  })

  it('does not show the retry button when showRetry is not provided', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Test error message',
      },
    })

    expect(wrapper.text()).toContain('Test error message')
    const button = wrapper.find('button')
    expect(button.exists()).toBe(false)
  })
})
