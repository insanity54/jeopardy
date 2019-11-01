<template>
  <div class="bottom-control-bar">
    <Revealer/>
    <Notices/>
    <Spacer/>
    <PlayerSelector/>
    <Spacer/>
    <HomeButton/>
  </div>
</template>

<script>
import PlayerSelector from './PlayerSelector';
import Notices from './Notices';
import HomeButton from './HomeButton';
import Spacer from './Spacer';
import Revealer from './Revealer';
export default {
  name: 'BottomControlBar',
  components: {
    Revealer,
    PlayerSelector,
    Notices,
    HomeButton,
    Spacer
  },
  computed: {
    isEditMode: function () {
      return this.$store.state.meta.edit;
    }
  },
  props: {
  },
  methods: {
  }
}
</script>

<style>
.bottom-control-bar {
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
