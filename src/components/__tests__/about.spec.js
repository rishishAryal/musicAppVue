import AboutView from '@/views/AboutView.vue'
import { shallowMount } from '@vue/test-utils'
import { describe,test,expect } from 'vitest'
describe('AboutView.vue', () => {
  test('render inner text', () => {
    const wrapper = shallowMount(AboutView)

    expect(wrapper.text()).toContain('about')
  })
})
