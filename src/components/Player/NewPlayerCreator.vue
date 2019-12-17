<template>
  <div class="new-player-creator" :style="{ backgroundColor: playerColor }">
    <p>Welcome, New Player!</p>
    <h1>{{ playerName }}</h1>
    <label for="player-name-input">Player Name:</label>
    <input id="player-name-input" v-model="playerName" type=text />
    <label>Player Color:</label>
    <Compact v-model="playerColor" />
    <p>name: {{ playerName }}</p>
    <p>id: {{ playerId }}</p>
    <p>color: {{ playerColor.hex }}</p>
    <p>houseId: {{ houseId }}</p>
    <div class="button"><i class="material-icons">save_alt</i>Save</div>
  </div>
</template>

<script>
import { Compact } from 'vue-color';
import { uuidv4 } from '@/util/util';
export default {
  name: 'NewPlayerCreator',
  components: {
    Compact
  },
  data: function () {
    return {
      defaultNames: [
        'Achcauhtli',
        'Bailey',
        'Chen',
        'Delaney',
        'Etalpalli',
        'Florry',
        'Gale',
        'Haneul',
        'Icnoyotl',
        'Jaswinder',
        'Kaimana',
        'Kai',
        'Lieve',
        'Machlah',
        'Nuka',
        'Oluwatoyin',
        'Patli',
        'Qing',
        'Refilwe',
        'Sacha',
        'Taylor',
        'Tate',
        'Teoxihuitl',
        'Udo',
        'Vered',
        'Wen',
        'Xipil',
        'Yolyamanitzin',
        'Zorion'
      ],
      defaultColors: [
        '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
        '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
        '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
        '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
        '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
        '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
      ],
      playerId: '',
      houseId: '',
      playerName: 'New Player',
      playerColor: ''
    }
  },
  props: {
  },
  methods: {
    getRandomName: function () {
      return this.defaultNames[Math.floor(Math.random()*this.defaultNames.length)];
    },
    getRandomColor: function () {
      return this.defaultColors[Math.floor(Math.random()*this.defaultColors.length)];
    }
  },
  computed: {
  },
  created: function () {
    this.playerName = this.getRandomName();
    this.houseId = this.$route.query.houseId;
    this.playerId = uuidv4();
    this.playerColor = this.getRandomColor();
    this.$socket.emit('createPlayer', {
      name: this.playerName,
      color: this.playerColor,
      id: this.playerId
    });

    this.$store.commit('createPlayer', {
      name: this.playerName,
      color: this.playerColor,
      id: this.playerId
    });

    this.$store.commit('setHouseId', this.houseId);
    this.$store.commit('setRole', 'player');
    this.$store.commit('setPlayerId', this.playerId);

    // redirect to the new player ID page
    this.$router.replace(`/player/${this.playerId}`);
  }
}
</script>

<style scoped>
.new-player-creator {
  font-weight: bold;
  color: white;
  text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 3px solid grey;
  border-radius: 5px;
  margin: 1em;
  padding: 2em 1em;
}
</style>
