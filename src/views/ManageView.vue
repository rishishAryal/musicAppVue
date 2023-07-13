<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <app-composition-item
              v-for="(song, i) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import useUSerStore from '@/stores/user'
import AppUpload from '@/components/AppUpload.vue'
import AppCompositionItem from '@/components/AppCompositionItem.vue'

import { songsCollection, auth } from '@/includes/firebase'

export default {
  name: 'manage',

  components: {
    AppUpload,
    AppCompositionItem
  },

  data() {
    return {
      songs: [],
      unsavedFlaq: false
    }
  },

  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach(this.addSong)
  },
  methods: {
    updateSong(i, values) {
      this.song[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id
      }
      this.songs.push(song)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlaq = value
    }
  },

  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlaq) {
      next()
    } else {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave)
    }
  }

  // beforeRouteEnter(to, from, next) {
  //   const store = useUSerStore()
  //   console.log('before route enter gaurd')
  //   store.userLoggedIn ? next() : next({ name: 'home' })
  // }
}
</script>
