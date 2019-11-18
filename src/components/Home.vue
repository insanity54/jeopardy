<template>
  <div class="home">
    <div class="header">
      <h1>Jepurdee</h1>
    </div>
    <div class="description">
      <p>Jepurdee is a trivia game played with coworkers, friends and family.</p>
      <p>In Jepurdee, the host provides the answer to a question. Players must come up with the <span class="dookie">question</span> in the form of, "who is ...", "what is ..." etc.</p>
      <p>To begin, display this webpage on a large screen in your home or office. This large screen is called the "jumbotron" in Jepurdee.</p>
      <p>Choose a person who will host the game.</p>
      <p>The host should visit the below URL on their smart phone. For convenience, the following QR code will direct the host to that URL. Only the host should scan this code.</p>
      <qrcode :value="hostUrl"></qrcode>
      <p>{{ hostUrl }}</p>
    </div>
    <HouseId />
    <div class="footer"></div>
  </div>
</template>

<script>
import HouseId from '@/components/HouseId';
export default {
  name: 'Home',
  props: {
  },
  components: {
    HouseId
  },
  sockets: {
    routeJumbotron: function (evt) {
      let { to } = evt;
      console.log(`routeJumbotron emission detected. ${to}`);
      this.$router.push(to);
    }
  },
  computed: {
    hostUrl: function () {
      return `${location.origin}/host?houseId=${this.houseId}`;
    },
    houseId: function () {
      return this.$store.state.meta.houseId;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: navy;
    color: white;
  }
  .description p {
    width: 50vw;
    margin-bottom: 1em;
  }
  .header h1 {
    color: white;
    font-size: 70px;
  }
  .dookie {
    font-style: italic;
  }
  .footer {
    margin-bottom: 1em;
  }
</style>
