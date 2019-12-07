<template>
  <div class="buzzer-test">
    <h1>Buzzer Test</h1>
    <div class="buzzer-data">
      <div class="buzzer-result">
        <div class="buzzer-result-winner">
          <p>The winner is</p>
          <div class="winner-box" :style="{backgroundColor: colorLookup(winner)}">
            <p class="winner-name">{{ nameLookup(winner) }}</p>
            <p class="winner-response-time">{{ reactionTime }}</p>
          </div>
        </div>
        <div class="buzzer-result-seen">
          <p>Buzzers seen</p>
          <div class="seen" v-for="(p, i) in seen" :key="i" :style="{backgroundColor: colorLookup({id: p})}">{{ nameLookup({id: p}) }} ({{ lowestReactionTimeLookup(p) }})</div>
        </div>
      </div>
      <div ref="bhist" class="buzzer-history">
        <div class="buzzer-history-item" v-for="(l, i) in buzzLog" :key="i">
          <div class="name" :style="{backgroundColor: colorLookup(l)}">{{ nameLookup(l) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuzzerTest',
  components: {
  },
  data: function () {
    return {
      winner: {}
    }
  },
  sockets: {
    buzzWinner: function (evt) {
      console.log('winner seen');
      this.winner = evt;
    },
    buzz: function (evt) {
      this.$store.commit('buzz', evt);
      this.scroll();
    },
    lockBuzzer: function () {
      this.winner = {};
    }
  },
  computed: {
    buzzLog: function () {
      return this.$store.state.buzzer.buzzLog;
    },
    seen: function () {
      return this.buzzLog.map((l) => l.id).filter(this.onlyUnique);
    },
    isBuzzerLocked: function () {
      return this.$store.state.buzzer.isLocked;
    },
    lockVariant: function () {
      return (this.isBuzzerLocked) ? 'lock' : 'lock_open';
    },
    reactionTime: function () {
      if (typeof this.winner.reactionTime === 'undefined') return '';
      let m = this.winner.reactionTime;
      return (m/1000);
    },
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
      let player = this.$store.state.players.find((p) => p.id === evt.id);
      if (typeof player === 'undefined') return 'mystery player';
      return player.name;
    },
    lowestReactionTimeLookup: function (id) {
      if (typeof id === 'undefined') return '';
      let playerReactions = this.buzzLog.filter((log) => log.id === id);
      let lowestReactionTime = [];
      playerReactions.forEach((r) => {
        lowestReactionTime.push(r.reactionTime);
      });
      lowestReactionTime.sort((a, b) => a - b);
      return `${lowestReactionTime[0]/1000}s`;
    }
  },
  created() {

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
  width: 66vw;
  overflow: scroll;
}
.buzzer-history-item {
  display: flex;
  flex-direction: row;
  margin: 0.5em 1em;
  padding: 0.5em 1em;
}
.buzzer-result {
  width: 33vw;
  background-color: navy;
  padding: 1em 0 0 0;
  font-size: 24pt;
}
.name {
  font-size: 24pt;
  padding: 1em;
}
.winner-box {
  padding: 1em;
  margin: 1em;
}
p.winner-response-time {
  font-size: 12pt;
}
.seen {
  margin: 0 1em;
}
</style>
