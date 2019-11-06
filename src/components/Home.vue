<template>
  <div class="home">
    <div class="header">
      <h1>Jepurdee?</h1>
    </div>
    <MainMenu/>
  </div>
</template>

<script>
import MainMenu from './MainMenu';
export default {
  name: 'Home',
  props: {
  },
  components: {
    MainMenu
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header h1 {
    color: white;
    font-size: 70px;
  }
</style>
