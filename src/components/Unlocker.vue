<template>
  <div v-if="isAnswerScreen" class="unlocker">
    <div class="button unlock-button" :class="{selected: !isLocked}" @click.prevent="unlockBuzzers()">
      <i class="material-icons">lock_open</i>
    </div>
    <div class="button lock-button" :class="{selected: isLocked}" @click.prevent="lockBuzzers()">
      <i class="material-icons">lock_outline</i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Unlocker',
  props: {
    isAnswerScreen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'isBuzzerLocked'
    ]),
    isLocked: function () {
      return this.isBuzzerLocked;
    }
  },
  methods: {
    unlockBuzzers: function () {
      return this.$store.commit('unlockBuzzers');
    },
    lockBuzzers: function () {
      return this.$store.commit('lockBuzzers');
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
