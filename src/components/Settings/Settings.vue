<template>
  <div class="settings">
    <input type="radio" id="jumbotron" value="jumbotron" v-model="role">
    <label for="jumbotron">Jumbotron</label>
    <br>
    <input type="radio" id="player" value="player" v-model="role">
    <label for="player">Player</label>
    <br>
    <input type="radio" id="host" value="host" v-model="role">
    <label for="host">Host</label>
    <br>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
}
</style>
