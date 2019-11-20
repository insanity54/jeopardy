<template>
  <div class="jumbotron-controller">
    <router-view />
    <AudioPlayer/>
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
