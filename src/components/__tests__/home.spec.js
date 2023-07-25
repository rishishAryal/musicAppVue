import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import AppSongItem from '@/components/AppSongItem.vue'
import { describe, test, expect } from 'vitest'

describe('HomeView.vue', () => {
  test('renders list of songs', () => {
    const songs = [{}, {}, {}]
    const component = shallowMount(HomeView, {
      data() {
        return {
          songs
        }
      },
      global: {
        mocks: {
          $t: (message) => message
        }
      }
    })

    const items = component.findAllComponents(AppSongItem)
    expect(items).toHaveLength(songs.length)
    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i])
    })
  })
})
