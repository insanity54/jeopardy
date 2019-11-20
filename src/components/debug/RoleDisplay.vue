<template>
  <div class="role-display">
    <p>{{ role }}</p>
  </div>
</template>

<script>
export default {
  name: 'RoleDisplay',
  components: {
  },
  data: function () {
    return {
      uri: ''
    }
  },
  computed: {
    role: function () {
      return this.$store.state.meta.role;
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.role-display {
  position: absolute;
  color: white;
  font-size: 12pt;
  background-color: red;
  opacity: 0.5;
  top: 50vh;
  left: 50vw;
  padding: 1em;
  pointer-events: none;
}
</style>
