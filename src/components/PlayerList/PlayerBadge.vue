<template>
  <div class="player-badge" :style="{backgroundColor: player.color}">
    <div class="player-badge-heading">
      <span v-if="!isEditMode" class="player-name">{{ player.name }}</span>
      <input v-if="isEditMode" class="" v-model="playerName" type="text">
      <div class="spacer-small"></div>
      <div @click="isEditMode = !isEditMode" class="edit-name-button">
        <i class="material-icons">edit</i>
      </div>
      <div @click="deletePlayer" class="edit-name-button">
        <i class="material-icons">delete</i>
      </div>
    </div>
    <div class="player-badge-content">
      <div class="player-badge-color-chooser">
        <Compact v-model="color" />
      </div>
      <span class="yolo"></span>
    </div>
  </div>
</template>

<script>
import { Compact } from 'vue-color';

export default {
  name: 'PlayerBadge',
  components: {
    Compact
  },
  data: function () {
    return {
      isEditMode: false
    }
  },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  methods: {
    deletePlayer: function () {
      this.$store.commit('deletePlayer', { id: this.player.id });
    }
  },
  computed: {
    color: {
      get () {
        return this.player.color;
      },
      set (value) {
        this.$store.commit('updatePlayerColor', { playerId: this.player.id, color: value.hex });
      }
    },
    playerName: {
      get () {
        return this.player.name;
      },
      set (value) {
        this.$store.commit('updatePlayerName', { id: this.player.id, name: value });
      }
    }
  },
}
</script>

<style scoped>
  .spacer-small {
    margin-right: 0.5em;
  }
  .player-badge {
    background-color: white;
    display: flex;
    flex-direction: column;
    border: 3px solid grey;
    border-radius: 5px;
    padding: 1em;
    margin: 0.5em 1em;
    color: black;
    width: 25vw;
  }
  .player-badge-heading {
    font-size: 18pt;
    font-weight: bold;
    color: white;
    text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
    display: flex;
    flex-direction: row;
    margin: 1em 0;
  }
  .player-badge-content {
    display: flex;
    flex-direction: row;
  }
  .player-badge-color-chooser {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .player-badge-color-box {
    border-radius: 5px;
    width: 25px;
    height: 25px;
  }
</style>
