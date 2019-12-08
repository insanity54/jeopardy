<template>
  <div class="sidebar">
    <PlayerJoinQR />
    <Scoreboard />
  </div>
</template>

<script>
import Scoreboard from '@/components/Game/Scoreboard';
import PlayerJoinQR from '@/components/Player/PlayerJoinQR';
export default {
  name: 'Sidebar',
  components: {
    Scoreboard,
    PlayerJoinQR
  },
  props: {
  },
  computed: {
  },
  methods: {
  },
  created: function () {
  }
}
</script>

<style scoped>
.sidebar {
}
</style>
