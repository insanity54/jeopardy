<template>
  <div class="jumbotron-controller">
    <h1>DEPRECATED</h1>
    <router-view />
    <transition name="component-fade" mode="out-in">
      <Scoreboard v-if="isOverworld" />
    </transition>
  </div>
</template>

<script>

import Scoreboard from '@/components/Controls/Scoreboard';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
export default {
  name: 'JumbotronController',
  components: {
    AudioPlayer,
    Scoreboard
  },
  sockets: {

  },
  computed: {
    isOverworld: function () {
      return !this.$route.fullPath.includes('answer')
    }
  }
}
</script>

<style scoped>
</style>
