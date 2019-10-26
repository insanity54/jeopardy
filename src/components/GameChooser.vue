<template>
  <div class="game-chooser">
    <div class="game-chooser-heading">
      <h2>Please Choose a Game</h2>
    </div>
    <div class="game-choices">
      <div :key="game.id" v-for="game in games">
        <GameChoice :game="game"></GameChoice>
      </div>
    </div>
  </div>
</template>


<script>
import GameChoice from './GameChoice';
export default {
  name: 'GameChooser',
  components: {
    GameChoice
  },
  created: function() {

  },
  props: {
    games: {
      type: Array,
      required: false,
      default: () => [
        {
          title: 'Old Game',
          id: '002',
          img: 'https://placekitten.com/300/200'
        },
        {
          title: 'Anicent Game',
          id: '003',
          img: 'https://placekitten.com/300/200'
        },
        {
          title: 'Segment Ultima Delta Marqui Figero Game',
          id: '004',
          img: 'https://placekitten.com/300/200'
        },
        {
          title: 'Trendy Game',
          id: '005',
          img: 'https://placekitten.com/300/200'
        }
      ]
    }
  }
}
</script>


<style scoped>
.game-chooser h2 {
  color: white;
}
.game-choices {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
