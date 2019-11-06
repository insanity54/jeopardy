<template>
  <div class="audio-player">
    <!-- greets https://codepen.io/getreworked/pen/QrgEOG -->
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
  },
  data: function () {
    return {
      audios: [
        {
          id: 'lazer',
          name: 'lazer',
          file: new Audio('/lazor.ogg'),
          isPlaying: false
        },
        {
          id: 'generate',
          name: 'generate',
          file: new Audio('/generate.ogg'),
          isPlaying: false
        },
      ]
    }
  },
  computed: {
    audioQueue: function () {
      return this.$store.state.audio.audioQueue;
    }
  },
  methods: {
    play (audio) {
      console.log(`playing audio ${audio}`)
      audio.isPlaying = true;
      audio.file.play();
    }
  },
  created: function () {
    this.$root.$on('play-audio', (arg) => {
      this.play(this.audios.find((a) => a.id === arg));
    })
  },
  destroyed: function () {
    this.$root.$off('play-audio');
  }
}
</script>

<style scoped>
</style>
