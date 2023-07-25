import AppSongItem from '@/components/AppSongItem.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

import { describe, test, expect } from 'vitest'

describe('AppSongItem.vue', () => {
  test('render song.display_name', () => {
    const song = {
      display_name: 'test'
    }
    const wrapper = shallowMount(AppSongItem, {
      propsData: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })
    const compositionAuthor = wrapper.find('.text-gray-500')

    expect(compositionAuthor.text()).toBe(song.display_name)
  })
  //  *******************************************

  test('render song.docID in id attribute', () => {
    const song = {
      docID: 'abc'
    }

    const wrapper = shallowMount(AppSongItem, {
      propsData: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    // expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`)
    expect(wrapper.classes()).toContain(`song-id-${song.docID}`)
  })
})
