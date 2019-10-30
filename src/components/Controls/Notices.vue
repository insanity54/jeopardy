<template>
  <div class="notices">
    <span v-if="isEditMode" class="debug blink">EDIT MODE</span>
    <span>{{ notice }} {{ completedCount }}/30</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Notices',
  components: {
  },
  computed: {
    ...mapGetters([
      'completedAnswerCounter'
    ]),
    isEditMode: function () {
      return (this.$store.state.meta.edit === true);
    },
    notice: function () {
      if (this.completedAnswerCounter === 15) return 'Get to know the players!';
      else return '';
    },
    completedCount: function () {
      return `${this.completedAnswerCounter}`
    }
  },
  props: {
  },
  methods: {
  }
}
</script>

<style>
.notices {
  display: flex;
  flex-direction: row;
  color: white;
}
.debug {
  color: red;
  font-weight: bold;
  margin-right: 3em;
}
.blink {
  animation: blinker 1s cubic-bezier(.5, 0, 1, 1) infinite alternate;
}
@keyframes blinker { to { opacity: 0; } }

</style>
