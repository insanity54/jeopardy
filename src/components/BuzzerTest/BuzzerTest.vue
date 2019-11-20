<template>
  <div class="buzzer-test">
    <h1>Buzzer Test</h1>
    <div class="buzzer-data">
      <div class="buzzer-result">
        <div class="buzzer-result-winner">
          <p>The winner is</p>
          <div class="winner-name" :style="{backgroundColor: colorLookup(winner)}">{{ nameLookup(winner) }}</div>
        </div>
        <div class="buzzer-result-seen">
          <p>Buzzers seen</p>
          <div class="seen" v-for="(p, i) in seen" :key="i" :style="{backgroundColor: colorLookup({id: p})}">{{ nameLookup({id: p}) }}</div>
        </div>
      </div>
      <div ref="bhist" class="buzzer-history">
        <div class="buzzer-history-item" v-for="(l, i) in buzzer.buzzLog" :key="i">
          <div class="name" :style="{backgroundColor: colorLookup(l)}">{{ nameLookup(l) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let undecidedWinner = { name: '...' };
import Buzzer from '@/util/buzzer';
export default {
  name: 'BuzzerTest',
  components: {
  },
  data: function () {
    return {
      buzzer: null,
      winner: null
    }
  },
  sockets: {
    buzzWinner: function (evt) {
      this.winner = evt;
    },
    buzz: function (evt) {
      this.buzzer.logBuzz(evt);
      this.scroll();
    },
    unlockBuzzer: function () {
      // this.buzzer.unlockBuzzer();
    },
    lockBuzzer: function () {
      this.winner = undecidedWinner;
      this.buzzer.clearLog();
    }
  },
  computed: {
    seen: function () {
      return this.buzzer.buzzLog.map((l) => l.id).filter(this.onlyUnique);
    },
    isBuzzerLocked: function () {
      return this.$store.state.game.game.buzzerLock;
    },
    lockVariant: function () {
      return (this.isBuzzerLocked) ? 'lock' : 'lock_open';
    }
  },
  methods: {
    onlyUnique: function (value, index, self) {
      return self.indexOf(value) === index;
    },
    scroll: function () {
      this.$refs.bhist.scrollTop = this.$refs.bhist.scrollHeight;
    },
    colorLookup: function (evt) {
      if (typeof evt.id === 'undefined') return 'navy';
      if (typeof evt.act !== 'undefined') return 'navy';
      let p = this.$store.state.players.find((p) => p.id === evt.id);
      if (
        typeof p === 'undefined' ||
        typeof p.color === 'undefined'
      ) return 'navy';
      else return p.color;
    },
    nameLookup: function (evt) {
      if (typeof evt.id === 'undefined') return '...';
      if (typeof evt.act !== 'undefined') return evt.act;
      return this.$store.state.players.find((p) => p.id === evt.id).name;
    },
  },
  created() {
    this.winner = undecidedWinner;
    this.buzzer = new Buzzer();
  }
}
</script>

<style scoped>
.buzzer-test {
  color: white;
  height: 100vh;
}
.lock-indicator i {
  font-size: 100pt;
}
.buzzer-data {
  display: flex;
  flex-direction: row;
}
.buzzer-history {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  height: 70vh;
  width: 75vw;
  overflow: scroll;
}
.buzzer-history-item {
  display: flex;
  flex-direction: row;
  margin: 0.5em 1em;
  padding: 0.5em 1em;
}
.buzzer-result {
  width: 25vw;
  background-color: navy;
  padding: 1em 0 0 0;
  font-size: 24pt;
}
.name {
  font-size: 24pt;
  padding: 1em;
}
.winner-name {
  padding: 1em;
  margin: 1em;
}
.seen {
  margin: 0 1em;
}
</style>
