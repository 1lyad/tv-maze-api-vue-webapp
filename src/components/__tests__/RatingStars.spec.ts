import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RatingStars from '@/components/ui/RatingStars.vue'

describe('RatingStars.vue', () => {
  it('renders 5 full stars when rating is 10', () => {
    const wrapper = mount(RatingStars, {
      props: {
        rating: 10,
      },
    })
    const stars = wrapper.findAll('.star-rating__star')
    expect(stars.length).toBe(5)
    stars.forEach((star) => {
      expect(star.classes()).toContain('star-rating__star--full')
      expect(star.attributes('style') || '').not.toContain('linear-gradient')
    })
    expect(wrapper.text()).toContain('10 / 10')
  })

  it('renders 5 empty stars when rating is 0', () => {
    const wrapper = mount(RatingStars, {
      props: {
        rating: 0,
      },
    })
    const stars = wrapper.findAll('.star-rating__star')
    expect(stars.length).toBe(5)
    stars.forEach((star) => {
      expect(star.classes()).not.toContain('star-rating__star--full')
      expect(star.attributes('style') || '').toBe('')
    })
    expect(wrapper.text()).toContain('0 / 10')
  })

  it('renders 2 filled stars when rating is 4', () => {
    const wrapper = mount(RatingStars, {
      props: {
        rating: 4,
      },
    })
    const stars = wrapper.findAll('.star-rating__star')
    expect(stars.length).toBe(5)
    expect(stars[0].classes()).toContain('star-rating__star--full')
    expect(stars[1].classes()).toContain('star-rating__star--full')
    expect(stars[2].classes()).not.toContain('star-rating__star--full')
    expect(stars[2].attributes('style') || '').toBe('')
    expect(stars[3].attributes('style') || '').toBe('')
    expect(stars[4].attributes('style') || '').toBe('')
    expect(wrapper.text()).toContain('4 / 10')
  })
})
