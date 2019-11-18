<template>
  <div class="player-badge" :style="{backgroundColor: player.color}">
    <div class="player-badge-heading">
      <span v-if="!isEditMode" class="player-name">{{ player.name }}</span>
      <input v-if="isEditMode" class="" v-model="playerName" type="text">
      <div class="spacer-small"></div>
      <div class="player-badge-controls">
        <div @click="isEditMode = !isEditMode" class="edit-name-button">
          <i class="material-icons">edit</i>
        </div>
        <div @click="deletePlayer" class="edit-name-button">
          <i class="material-icons">delete</i>
        </div>
        <div v-show="!isPlayerPage" @click="kickPlayer" class="material-icons">
          <i class="material-icons">flag</i>
        </div>
      </div>
    </div>
    <div class="player-badge-content">
      <div class="player-badge-color-chooser">
        <Compact v-model="color" />
      </div>
      <transition name="fade">
        <div v-if="buzzed" class="buzzer-tester">
          <i class="material-icons">touch_app</i>
        </div>
      </transition>
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
      isEditMode: false,
      pid: ''
    }
  },
  props: {
    playerId: {
      type: String,
      required: false
    }
  },
  methods: {
    kickPlayer: function () {
      this.$socket.emit('kickPlayer', { id: this.player.id });
      this.$store.commit('deletePlayer', { id: this.player.id });
    },
    deletePlayer: function () {
      if (this.isPlayerPage) {
        this.$router.replace(`/player/new?houseId=${this.houseId}`);
      }
      this.$socket.emit('deletePlayer', { id: this.player.id });
      this.$store.commit('deletePlayer', { id: this.player.id });
    },
  },
  computed: {
    isPlayerPage: function () {
      // whether or not component is rendered on /player/:id page
      if (!this.$route.params.playerId) return false;
      return true;
    },
    houseId: function () {
      return this.$store.state.meta.homeId;
    },
    color: {
      get () {
        return this.player.color;
      },
      set (value) {
        this.$socket.emit('updatePlayerColor', { playerId: this.player.id, color: value.hex });
        this.$store.commit('SOCKET_updatePlayerColor', { playerId: this.player.id, color: value.hex });
      }
    },
    playerName: {
      get () {
        return this.player.name;
      },
      set (value) {
        this.$socket.emit('updatePlayerName', { id: this.player.id, name: value });
        this.$store.commit('updatePlayerName', { id: this.player.id, name: value });
      }
    },
    player: function () {
      return this.$store.state.players.find((p) => p.id === this.playerId);
    }
  },
  created: function () {
    if (typeof this.$route.params.playerId !== 'undefined') {
      return this.pid = this.$route.params.playerId;
    }
    if (typeof this.playerId !== 'undefined') {
      return this.pid = this.playerId;
    }
  }
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
    justify-content: space-between;
    margin: 1em 0;
  }
  .player-badge-controls {
    display: flex;
    flex-direction: row;
  }
  .player-badge-content {
    display: flex;
    flex-direction: column;
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
  .buzzer-tester {
    color: black;
  }
  .buzzer-tester i {
    font-size: 48pt;
  }
  .fade-leave-active {
    transition: opacity 0.5s linear;
  }
  .fade-leave-to {
    opacity: 0;
  }
</style>
