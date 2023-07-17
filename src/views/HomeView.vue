<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"
    ></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Welcome to Melody Haven, where melody meets creativity! Discover a harmonious community
          where you can showcase your own musical masterpieces while delighting in the tunes of
          fellow artists. Upload your tracks and let your sound reverberate through our platform,
          captivating listeners from all corners of the globe. Immerse yourself in a symphony of
          genres and experience the joy of discovering new sounds. Tune in, upload, and let the
          rhythm of your passion resound on our vibrant music website.
        </p>
      </div>
    </div>

    <img
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="/assets/img/introduction-music.png"
    />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div
        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        v-icon-secondary="{
          icon: 'headphones-alt',
          right: true
        }"
      >
        <span class="float-left card-title">Songs</span>
        <!-- Icon -->
      </div>
      <!-- Playlist -->
      <ol id="playlist" class="text-left">
        <app-song-item v-for="song in songs" :key="song.docId" :song="song" />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import AppSongItem from '../components/AppSongItem.vue'
import { songsCollection } from '@/includes/firebase'
import IconSecondary from '@/directives/icon-secondary'

export default {
  name: 'HomeView',
  components: {
    AppSongItem
  },

  directives: {
    'icon-secondary': IconSecondary
  },
  data() {
    return {
      songs: [],
      maxPerPage: 10,
      pendingRequest: false
    }
  },

  async created() {
    this.getSongs()

    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

      if (bottomOfWindow) {
        this.getSongs()
      }
    },

    async getSongs() {
      if (this.pendingRequest) {
        return
      }
      this.pendingRequest = true
      let snapshots
      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docId).get()

        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get()
      } else {
        snapshots = await songsCollection.orderBy('modified_name').limit(this.maxPerPage).get()
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docId: document.id,
          ...document.data()
        })
      })
      this.pendingRequest = false
    }
  }
}
</script>
