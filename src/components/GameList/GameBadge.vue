<template>
  <div class="game-badge">
    <div class="game-badge-heading">
      <span class="game-name">{{ game.name }}</span>
      <span class="game-type">{{ game.gameType }}</span>
    </div>
    <div class="game-badge-content">
      <div class="game-badge-game-image">
        <img :src="game.image">
      </div>
      <div class="game-badge-controls">
        <div class="spacer-small"></div>
        <div @click="goToGame" class="button">
          <i class="material-icons">play_arrow</i>Play
        </div>
        <div class="button">
          <i class="material-icons">edit</i>Edit
        </div>
        <div @click="deleteGame" class="button">
          <i class="material-icons">delete</i>Delete
        </div>
      </div>
        <div class="game-badge-color-chooser">
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'GameBadge',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    color: {
      get () {
        return this.game.color;
      },
      set (value) {
        this.$store.commit('updateGameColor', { GameId: this.game.id, color: value.hex });
      }
    },
    gameName: {
      get () {
        return this.game.name;
      },
      set (value) {
        this.$store.commit('updateGameName', { id: this.game.id, name: value });
      }
    },
    isEditMode: function () {
      return this.$store.state.game.game.edit;
    },
    gameLink: function () {
      return `/game/${this.game.id}`
    }
  },
  methods: {
    deleteGame: function () {
      this.$store.commit('deleteGame', { id: this.game.id });
    },
    goToGame: function () {
      if (this.isEditMode) this.$store.commit('leaveEditMode');
      this.$store.commit('loadGame', this.game.id);
      this.$router.push(this.gameLink);
    },
    restartGame: function () {
      this.$store.commit('restartGame', this.game.id);
    },
    goToGameEditor: function() {
      if (!this.isEditMode) this.$store.commit('enterEditMode');
      this.$store.commit('loadGame', this.game.id);
      this.$router.push(this.gameLink);
    }
  }
}
</script>

<style scoped>
  .spacer-small {
    margin-right: 0.5em;
  }
  .game-badge {
    color: white;
    background-color: navy;
    display: flex;
    flex-direction: column;
    border: 3px solid grey;
    border-radius: 5px;
    padding: 1em;
    margin: 0.5em 1em;
    width: 25vw;
    justify-content: space-between;
  }
  .game-badge-heading {
    font-size: 18pt;
    font-weight: bold;
    color: white;
    text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
    display: flex;
    flex-direction: column;
    margin: 1em 0;
  }
  .game-badge-heading :nth-child(2) {
    font-size: 12pt;
    font-weight: normal;
  }
  .game-badge-content {
    display: flex;
    flex-direction: column;
  }
  .game-badge-game-image {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 1em 0;
  }
  .game-badge-controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
