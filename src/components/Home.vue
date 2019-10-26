<template>
  <div class="home">
    <div class="header">
      <h1>Jeopardy!</h1>
    </div>
    <GameChooser :games="games"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameChooser from './GameChooser';
export default {
  name: 'Home',
  props: {
  },
  components: {
    GameChooser
  },
  computed: {
    ...mapGetters([
      'games'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header h1 {
    color: white;
    font-size: 70px;
  }
</style>
