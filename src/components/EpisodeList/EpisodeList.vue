<template>
  <div class="episode-list">
    <div class="episode-list-heading">
      <HomeButton/><h1>Episode List</h1>
    </div>
    <div class="episode-list-content">
      <NewEpisodeButton/>
      <EpisodeBadge v-for="episode in episodes" :key="episode.id" :episode="episode"/>
    </div>
  </div>
</template>

<script>
import EpisodeBadge from './EpisodeBadge';
import NewEpisodeButton from './NewEpisodeButton';
import HomeButton from '@/components/Controls/HomeButton';
export default {
  name: 'EpisodeList',
  components: {
    EpisodeBadge,
    NewEpisodeButton,
    HomeButton
  },
  props: {
  },
  computed: {
    episodes: function () {
      return this.$store.state.episode.episodes;
    }
  },
}
</script>

<style scoped>
.episode-list {
  color: white;
}
.episode-list-heading {
}
.episode-list-content {
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
