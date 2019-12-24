<template>
  <div v-if="player" class="final-reveal-card">
    <div class="question">
      {{ finalQuestion }}
    </div>
    <div class="wager">
      {{ finalWager }}
    </div>
  </div>
</template>

<script>
// import goodDogPlain from '@/assets/GOODDP__.TTF';
export default {
  name: 'FinalRevealCard',
  components: {
  },
  props: {
    playerId: {
      type: String,
      required: false
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
  @font-face {
    font-family: 'Good Dog Plain';
    src: url('~@/assets/GOODDP__.TTF');
  }
  @font-face {
    font-family: 'Khand';
    src: url('~@/assets/khand.ttf');
  }
  @font-face {
    font-family: 'Pecita';
    src: url('~@/assets/Pecita.otf');
  }
  @font-face {
    font-family: 'James Almacen';
    src: url('~@/assets/JamesAlmacen.ttf');
  }
  @font-face {
    font-family: 'Absinthe';
    src: url('~@/assets/Absinthe.ttf');
  }
  @font-face {
    font-family: 'Jean Sun Ho';
    src: url('~@/assets/JeanSunHo.ttf')
  }
  .final-reveal-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .answer, .wager {
    height: 50%;
    width: 100%;
    color: white;
    font-family: 'Good Dog Plain';
    font-size: 3em;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: navy;
    text-shadow: 2px 2px black;
    user-select: none;
    overflow: hidden;
  }
</style>
