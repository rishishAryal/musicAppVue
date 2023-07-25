import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import AppSongItem from '@/components/AppSongItem.vue'
import { describe, test, expect } from 'vitest'

describe('Router', () => {
  test('renders router links', () => {
    const song = {
      docID: 'abc'
    }

    const wrapper = shallowMount(AppSongItem, {
      propsData: { song },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docId }
    })
  })
})
