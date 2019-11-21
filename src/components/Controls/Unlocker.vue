<template>
  <div v-if="isBuzzableScreen" class="unlocker">
    <div class="button unlock-button" :class="{selected: !isLocked}" @click.prevent="unlockBuzzer()">
      <i class="material-icons">lock_open</i>
    </div>
    <div class="button lock-button" :class="{selected: isLocked}" @click.prevent="lockBuzzer()">
      <i class="material-icons">lock_outline</i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Unlocker',
  props: {
    isBuzzableScreen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState({
      answer: state => state.game.game.answer,
      buzzerLock: state => state.buzzer.isLocked
    }),
    isLocked: function () {
      return (this.buzzerLock === true);
    },
    houseId: function () {
      return this.$store.state.meta.houseId;
    }
  },
  methods: {
    unlockBuzzer: function () {
      this.$socket.emit('unlockBuzzer', { id: this.houseId, time: Date.now() });
      return this.$store.commit('unlockBuzzer');
    },
    lockBuzzer: function () {
      this.$socket.emit('lockBuzzer', { id: this.houseId, time: Date.now() });
      return this.$store.commit('lockBuzzer');
    }
  }
}
</script>

<style>
.unlock-button {
  background-color: DarkGoldenRod;
}
.lock-button {
  background-color: DarkGoldenRod;
}
.unlocker {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.selected {
  text-decoration: underline;
}
</style>
