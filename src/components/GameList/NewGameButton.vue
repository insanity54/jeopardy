<template>
  <div class="new-game-button">
    <div class="new-game-button-heading">
      Create a Game
    </div>
    <div class="new-game-button-content">
      <div class="new-game-type-selection">
        <h3>Game Type</h3>
        <p>Single is normally the first round played, with one daily double and questions ranging from 100 to 500 points.</p>
        <p>Double is traditionally played second, with two daily doubles and questions ranging from 200 to 1000 points.</p>
        <p>Final is the last round, with only one answer. The players place a wager on their ability to correctly guess the question.</p>
        <input v-model="gameType" name="gameType" type="radio" value="single">Single
        <input v-model="gameType" name="gameType" type="radio" value="double">Double
        <input v-model="gameType" name="gameType" type="radio" value="final">Final
      </div>
      <img @click="createGame" alt="Create a new game" class="button new-game-button-button" src="/plus.png">
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewGameButton',
  components: {
  },
  data: function () {
    return {
      gameType: 'single'
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    createGame: function () {
      this.$store.commit('createGame', { gameType: this.gameType });
    }
  }
}
</script>

<style scoped>
  .new-game-button-button {
    width: 50px;
  }
  .new-game-button {
    background-color: cyan;
    display: flex;
    flex-direction: column;
    border: 3px solid grey;
    border-radius: 5px;
    padding: 1em;
    margin: 0.5em 1em;
    color: black;
    width: 25vw;
  }
  .new-game-button-heading {
    font-size: 18pt;
    font-weight: bold;
    color: white;
    text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
    display: flex;
    flex-direction: row;
    margin: 1em 0;
  }
  .new-game-button-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .new-game-type-selection p {
    margin-bottom: 1em;
  }
</style>
