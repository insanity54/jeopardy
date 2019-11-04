<template>
<div class="new-game-badge">
  <div class="new-game-badge-heading">
    Create a Game
  </div>
  <div class="new-game-badge-content">
    <div class="new-game-type-selection">
      <h3>Game Type</h3>
      <p>Single is normally the first round played, with one daily double and questions ranging from 100 to 500 points.</p>
      <p>Double is traditionally played second, with two daily doubles and question ranging from 200 to 1000 points.</p>
      <p>Final is the last round, with only one question. The players place a wager on their ability to correctly guess the question.</p>
      <div class="new-game-badge-controls">
        <input v-model="gameType" name="gameType" type="radio" value="single">Single
        <input v-model="gameType" name="gameType" type="radio" value="double">Double
        <input v-model="gameType" name="gameType" type="radio" value="final">Final
        <div @click="createGame" class="button white-text">
          <i class="material-icons">add_box</i><span>Create New Game</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'NewGameBadge',
  components: {},
  data: function() {
    return {
      gameType: 'single',
      dats: [],
    }
  },
  props: {},
  computed: {},
  methods: {
    createGame: function() {
      this.$store.commit('createGame', {
        gameType: this.gameType
      });
    }
  }
}
</script>

<style scoped>
.debug img {
  width: 50px;
}

.new-game-badge-button {
  width: 50px;
}

.new-game-badge {
  user-select: none;
  background-color: LightGreen;
  display: flex;
  flex-direction: column;
  border: 3px solid grey;
  border-radius: 5px;
  padding: 1em;
  margin: 0.5em 1em;
  color: black;
  width: 25vw;
}

.white-text {
  color: white;
}

.new-game-badge-heading {
  font-size: 18pt;
  font-weight: bold;
  color: white;
  text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
  display: flex;
  flex-direction: row;
  margin: 1em 0;
}

.new-game-badge-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-game-type-selection p {
  margin-bottom: 1em;
}
</style>
