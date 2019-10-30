<template>
  <div class="episode-badge" :style="{backgroundColor: episode.color}">
    <div class="episode-badge-heading">
      <span v-if="!isEditMode" class="episode-name">{{ episode.name }}</span>
      <input v-if="isEditMode" class="" v-model="episodeName" type="text">
      <div class="spacer-small"></div>
      <div @click="isEditMode = !isEditMode" class="edit-name-button">
        <i class="material-icons">edit</i>
      </div>
      <div @click="deleteEpisode" class="edit-name-button">
        <i class="material-icons">delete</i>
      </div>
    </div>
    <div class="episode-badge-content">
      <div class="episode-badge-game-chooser">
        <div class="episode-badge-game-chooser-heading">
          <h4>Single</h4>
        </div>
        <div class="episode-badge-game-chooser-content">
          <EpisodeChooser :isEditMode="isEditMode" :episode="episode" item="single"/>
        </div>
      </div>

        <div class="episode-badge-game-chooser">
          <div class="episode-badge-game-chooser-heading">
            <h4>Double</h4>
          </div>
          <div class="episode-badge-game-chooser-content">
            <EpisodeChooser :isEditMode="isEditMode" :episode="episode" item="double"/>
          </div>
        </div>

        <div class="episode-badge-game-chooser">
        <div class="episode-badge-game-chooser-heading">
          <h4>Final</h4>
        </div>
        <div class="episode-badge-game-chooser-content">
          <EpisodeChooser :isEditMode="isEditMode" :episode="episode" item="final"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import EpisodeChooser from './EpisodeChooser';
export default {
  name: 'EpisodeBadge',
  components: {
    EpisodeChooser
  },
  data: function () {
    return {
      isEditMode: false
    }
  },
  props: {
    episode: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteEpisode: function () {
      this.$store.commit('deleteEpisode', { id: this.episode.id });
    }
  },
  computed: {
    single: function () {
      return this.episode.single;
    },
    double: function () {
      return this.episode.double;
    },
    final: function () {
      return this.episode.final;
    },
    episodeName: {
      get () {
        return this.episode.name;
      },
      set (value) {
        this.$store.commit('updateEpisodeName', { id: this.episode.id, name: value });
      }
    }
  },
}
</script>

<style scoped>
  .spacer-small {
    margin-right: 0.5em;
  }
  .episode-badge {
    color: white;
    background-color: navy;
    display: flex;
    flex-direction: column;
    border: 3px solid grey;
    border-radius: 5px;
    padding: 1em;
    margin: 0.5em 1em;
    width: 25vw;
  }
  .episode-badge-heading {
    font-size: 18pt;
    font-weight: bold;
    color: white;
    text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
    display: flex;
    flex-direction: row;
    margin: 1em 0;
  }
  .episode-badge-content {
    display: flex;
    flex-direction: column;
  }
  .episode-badge-color-chooser {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .episode-badge-color-box {
    border-radius: 5px;
    width: 25px;
    height: 25px;
  }
  .episode-badge-game-chooser {
    display: flex;
    flex-direction: column;
  }
  .episode-badge-game-chooser-heading {
    display: flex;
  }
  .episode-badge-game-chooser-content {
    display: flex;
    flex-direction: row;
  }
</style>
