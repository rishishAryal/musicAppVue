<template>
  <!-- Header-->
  <app-header />

  <router-view></router-view>

  <!-- Player -->

  <app-player />
  <!-- Auth Modal -->
  <app-auth />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from './components/AppAuth.vue'
import AppPlayer from './components/AppPlayer.vue'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/user'
import { auth } from './includes/firebase'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
    
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>
