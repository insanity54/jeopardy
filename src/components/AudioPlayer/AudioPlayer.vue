<template>
  <div class="audio-player">
    <!-- greets https://codepen.io/getreworked/pen/QrgEOG -->
  </div>
</template>

<script>
import lazer from '@/assets/lazer.ogg';
import generate from '@/assets/generate.ogg';
import timeout from '@/assets/timeout.ogg';
import final from '@/assets/final.ogg';
import reveal from '@/assets/reveal.ogg';
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
          file: new Audio(lazer),
          isPlaying: false
        },
        {
          id: 'generate',
          name: 'generate',
          file: new Audio(generate),
          isPlaying: false
        },
        {
          id: 'timeout',
          name: 'timeout',
          file: new Audio(timeout),
          isPlaying: false
        },
        {
          id: 'final',
          name: 'final',
          file: new Audio(final),
          isPlaying: false
        },
        {
          id: 'reveal',
          name: 'reveal',
          file: new Audio(reveal),
          isPlaying: false
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    play (audio) {
      console.log(`playing audio ${audio.name}`)
      audio.isPlaying = true;
      audio.file.load();
      audio.file.play();
      audio.file.addEventListener('ended', () => {
        audio.isPlaying = false;
      })
    }
  },
  created: function () {
    this.$root.$on('play-audio', (arg) => {
      console.log(`play-audio event with arg ${arg}`);
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
