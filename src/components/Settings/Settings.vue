<template>
  <div class="settings">
    <div class="settings-heading">
      <h1>Settings</h1>
    </div>
    <h2>House ID</h2>
    <input type="text" v-model="houseId">
    <br>
    <h2>App Role</h2>
    <p>Jumbotron role is used as the large screen at the front of the room</p>
    <p>Player role is the mode used for each contestant. Meant to run on a smart phone.</p>
    <p>Host role is the mode for the game show host. This mode reveals questions and lets the game show host start and stop games.</p>
    <div class="settings-list">
      <div class="settings-item">
        <input type="radio" id="jumbotron" value="jumbotron" v-model="role">
        <label for="jumbotron">Jumbotron</label>
      </div>

      <div class="settings-item">
        <input type="radio" id="player" value="player" v-model="role">
        <label for="player">Player</label>
      </div>

      <div class="settings-item">
        <input type="radio" id="host" value="host" v-model="role">
        <label for="host">Host</label>
      </div>
    </div>
    <h2>Debug Mode</h2>
    <p>Debug mode shows extra information on screen which is useful for developers</p>
    <div class="settings-list">
      <div class="settings-item">
        <input type="checkbox" id="debug" v-model="debug">
        <label for="debug">Debug Mode</label>
      </div>
    </div>
    <h2>Workarounds</h2>
    <div class="lag-compensation">
      <label for="lc">Lag compensation (in milliseconds)</label>
      <input v-model="lagCompensation" id="lc" type="number">
    </div>
    <div class="button sync" @click="syncPlayerData">Synchronize Player Data</div>
    <br>
    <h2>Version</h2>
    <p>{{ version }}</p>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  props: {
  },
  data: function () {
    return {
      picked: ''
    }
  },
  components: {
  },
  computed: {
    version() {
      return global.__JEPURDEE_VERSION__;
    },
    lagCompensation: {
      get: function () {
        return this.$store.state.buzzer.lagCompensation;
      },
      set: function (value) {
        let n = parseInt(value);
        if (typeof n !== 'number') return;
        if (n < 0) return;
        this.$store.dispatch('setLagCompensation', { delay: n });
      }
    },
    role: {
      get: function () {
        return this.$store.state.meta.role;
      },
      set: function (value) {
        this.$store.commit('setRole', value);
      }
    },
    debug: {
      get: function () {
        return this.$store.state.meta.isDebugMode;
      },
      set: function (value) {
        this.$store.commit('setDebugMode', value);
      }
    },
    houseId: {
      get: function () {
        return this.$store.state.meta.houseId;
      },
      set: function (value) {
        this.$store.commit('setHouseId', value);
      }
    }
  },
  methods: {
    syncPlayerData: function () {
      this.$socket.emit('syncPlayerData', this.$store.state.players);
    }
  },
  created: function () {
    this.$store.dispatch('getLagCompensation');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button.sync {
  background-color: blue;
  padding: 0.5em;
}
.settings {
  color: white;
}
.settings-heading {
  margin: 1em 0;
}
.settings-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 2em 0;
}
.settings-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.3em;
}
</style>
