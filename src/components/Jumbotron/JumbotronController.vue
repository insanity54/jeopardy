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
    routeToScreen: function (data) {
      let { screenName, id } = data;
      if (screenName === 'players') this.$router.push('/jumbotron/players');
      else if (screenName === 'buzzerTest') this.$router.push('/jumbotron/buzzerTest');
      else if (screenName === 'game') {
        this.$store.commit('loadGame', id);
        this.$router.push(`/jumbotron/game/${id}`);
      }
    },
    unlockBuzzer: function () {
      this.$store.commit('unlockBuzzer');
    },
    lockBuzzer: function () {
      this.$store.commit('lockBuzzer');
    }
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
