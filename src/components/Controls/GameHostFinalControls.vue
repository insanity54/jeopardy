<template>
  <div class="game-host-final-controls">
    <FinalLifecycleControls />
    <FinalWagerDisplay />
  </div>
</template>

<script>
import FinalLifecycleControls from './FinalLifecycleControls';
import FinalWagerDisplay from './FinalWagerDisplay';
export default {
  name: 'GameHostFinalControls',
  components: {
    FinalLifecycleControls,
    FinalWagerDisplay
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
.game-host-answer-controls {
  color: white;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  user-select: none;
}
.button {
  display: flex;
  cursor: pointer;
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
