<template>
  <div class="score-board">
    <Notices/>
    <PlayerSelector/>
  </div>
</template>

<script>
import PlayerSelector from './PlayerSelector';
import Notices from './Notices';
export default {
  name: 'ScoreBoard',
  components: {
    PlayerSelector,
    Notices
  },
  computed: {
  },
  props: {
  },
  methods: {
  }
}
</script>

<style>
.score-board {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 5;
  height: 5vh;
  width: 100vw;
  top: 94vh;
  user-select: none;
}
.spacer {
  width: 2em;
}
.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 10px 5px 10px;
  margin: 0 3px 0 3px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
