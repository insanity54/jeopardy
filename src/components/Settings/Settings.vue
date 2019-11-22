<template>
  <div class="settings">
    <div class="settings-heading">
      <h1>Settings</h1>
    </div>
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
    role: {
      get: function () {
        return this.$store.state.meta.role;
      },
      set: function (value) {
        this.$store.commit('setRole', value);
      }
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  margin: 50px 0;
}
.settings-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;
}
</style>
