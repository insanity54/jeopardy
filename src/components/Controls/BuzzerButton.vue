<template>
  <div class="buzzer button" :style="{backgroundColor: player.color}" :class="{selected: isBuzzWinner, locked: isButtonLocked}" @click.prevent="clickPlayer(player)">
    {{ player.name }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'BuzzerButton',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'isBuzzerLocked'
    ]),
    isButtonLocked: function () {
      if (this.isBuzzerLocked) return true;
      return false;
    },
    isBuzzWinner: function () {
      return (this.player.buzzWinner);
    }
  },
  methods: {
    buzzPlayer: function (p) {
      return this.$store.commit('buzzPlayer', p);
    },
    clickPlayer: function (p) {
      if (this.isBuzzerLocked) return;
      return this.buzzPlayer(p);
    },
  }
}
</script>

<style scoped>
.selected {
  text-decoration: underline overline;
}
div.buzzer.locked {
  background-color: grey !important;
}
</style>
