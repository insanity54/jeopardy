<template>
  <div class="buzzer button" :class="{selected: isBuzzWinner, locked: isButtonLocked}" @click.prevent="clickPlayer(player)">
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
div.buzzer:nth-child(1) {
  background-color: green;
}
div.buzzer:nth-child(2) {
  background-color: red;
}
div.buzzer:nth-child(3) {
  background-color: blue;
}
div.buzzer:nth-child(4) {
  background-color: hotpink;
}
div.buzzer.locked {
  background-color: grey;
}
</style>
