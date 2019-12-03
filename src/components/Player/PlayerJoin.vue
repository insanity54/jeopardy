<template>
  <div class="player-join">
    <h1>Welcome, player!</h1>
    <p>Please enter the house ID. The house ID is shown on the jumbotron in <span class="bold">Bold Yellow Text</span></p>
    <div class="house-id-form"><input v-model="houseId" /><i class="material-icons" @click="joinWithHouseId">send</i></div>
  </div>
</template>

<script>
export default {
  name: 'PlayerJoin',
  components: {
  },
  data: function () {
    return {}
  },
  props: {
  },
  methods: {
    joinWithHouseId: function () {
      this.$router.push({
        path: '/player/new',
        query: {
          houseId: this.houseId
        }
      });
    }
  },
  computed: {
    houseId: {
      get: function () {
        return this.$store.state.meta.houseId;
      },
      set: function (value) {
        this.$store.commit('setHouseId', value);
      }
    },
    isDependenciesSatisfied: function () {
      // dependencies are playrId and houseId in vuex store.
      // returns true if meta.playerId and meta.houseId are populated
      if (
        this.$store.state.meta.playerId !== '' &&
        this.$store.state.meta.houseId !== ''
      ) return true;
      else return false;
    }
  },
  created: function () {
    // this function handles a few scenarios.
    //   1) returning player (existing data in vuex)
    //      scenario 1 means we should redirect to /player/${playerId}
    //   2) new player with houseId data (player scanned QR code)
    //      scenario 2 means we should redirect to /player/new
    //   3) new player with no data (player entered the URL manually)
    //      scenario 3 means the player needs to enter the houseId manualy

    // set the role to player. this ensures the JoinOverlay QR code does not display on the player's phone
    this.$store.commit('setRole', 'player');


    let playerId = this.$store.state.meta.playerId;
    let houseId = this.$route.query.houseId;


    // determine if we have the necessary data.
    // necessary data is
    // * houseId
    // * playerId
    // is the player returning after accidentally closing the tab, or is the player new?
    let isReturningPlayer = (
      typeof playerId !== 'undefined' && playerId !== '') ? true : false;
    let isHouseId = (
      typeof houseId !== 'undefined' && houseId !== '') ? true : false;


    // scenario 1 - returning player (playerId and houseId)
    // redirect to player page
    if (isReturningPlayer && isHouseId) {
      console.log(`playerId is ${playerId}, houseId is ${houseId}`)
      return this.$router.replace(`/player/${playerId}`)
    }

    // scenario 2 - new player with houseId
    // redirect to player creation
    else if (isHouseId) {
      return this.$router.replace('/player/new');
    }

    // scenario 3 - new player with no houseId
    // solicit houseId from player


  }
}
</script>

<style scoped>
.house-id-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.house-id-form input {
  margin: 0 1em;
}
.player-join > * {
  margin: 1em;
}
.player-join {
  color: white;
}
.bold {
  font-weight: bold;
  color: yellow;
}
</style>
