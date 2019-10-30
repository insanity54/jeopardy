<template>
  <div class="audio-player">
    <!-- greets https://codepen.io/getreworked/pen/QrgEOG -->
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      audios: [
        {
          id: 'lazer',
          name: 'Lazer',
          file: new Audio('/lazer.ogg'),
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
      audio.isPlaying = true;
      audio.file.play();
    }
  },
  created: function () {
    this.$root.$on('play-audio', () => {
      console.log('playing audio');
      this.play(this.audios[0]);
    })
  }
}
</script>

<style scoped>
</style>
