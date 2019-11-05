<template>
  <div class="game-badge">
    <div class="game-badge-heading">
      <span class="game-name">{{ game.name }}</span>
      <span class="game-type">{{ game.gameType }}</span>
    </div>
    <div class="game-badge-content">
      <div class="game-badge-game-image">
        <Avatar :data="game.id"/>
      </div>
      <div class="game-badge-controls">
        <div class="spacer-small"></div>
        <div @click="goToGame" class="button">
          <i class="material-icons">play_arrow</i>Play
        </div>
        <div @click="goToGameEditor" class="button">
          <i class="material-icons">edit</i>Edit
        </div>
        <div @click="restartGame" class="button">
          <i class="material-icons">autorenew</i>Restart
        </div>
        <div @click="exportGame" class="button">
          <i class="material-icons">import_export</i>Export
        </div>
        <div @click="deleteGame" class="button">
          <i class="material-icons">delete</i>Delete
        </div>
      </div>
        <div class="game-badge-color-chooser">
        </div>
      </div>
  </div>
</template>

<script>
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Avatar from "@/components/Avatar/Avatar";
export default {
  name: 'GameBadge',
  components: {
    Avatar
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    color: {
      get () {
        return this.game.color;
      },
      set (value) {
        this.$store.commit('updateGameColor', { GameId: this.game.id, color: value.hex });
      }
    },
    gameName: {
      get () {
        return this.game.name;
      },
      set (value) {
        this.$store.commit('updateGameName', { id: this.game.id, name: value });
      }
    },
    isEditMode: function () {
      return this.$store.state.meta.edit;
    },
    gameLink: function () {
      return `/game/${this.game.id}`
    }
  },
  methods: {
    deleteGame: function () {
      this.$store.commit('deleteGame', { id: this.game.id });
    },
    goToGame: function () {
      if (this.isEditMode) this.$store.commit('leaveEditMode');
      this.$store.commit('loadGame', this.game.id);
      this.$router.push(this.gameLink);
    },
    restartGame: function () {
      this.$store.commit('restartGame', this.game.id);
    },
    goToGameEditor: function() {
      if (!this.isEditMode) this.$store.commit('enterEditMode');
      this.$store.commit('loadGame', this.game.id);
      this.$router.push(this.gameLink);
    },
    exportGame: function () {
      let zip = new JSZip();
      zip.file(`${this.game.id}.json`, JSON.stringify(this.game));
      let assets = zip.folder('assets');
      // create assets.json which contains image name, type, and url.
      let assetsData = [];
      // loop through images and add them to the zip
      for (var i=0; i<this.game.answers.length; i++) {
        let answer = this.game.answers[i];
        if (typeof answer.image.url !== 'undefined') {
          let imgBlob = this.loadImage(answer.image.url);
          let { type, id, url } = answer.image;
          // console.log(`type:${type}, id:${id}, url:${url}`)
          console.log(imgBlob);
          assetsData.push({ type, id, url });
          assets.file(`${answer.id}.${type}`, imgBlob);
        }
      }
      // add assets.json to the zip object
      assets.file(`assets.json`, JSON.stringify(assetsData));
      zip.generateAsync({ type:"blob" }).then((content) => {
        saveAs(content, `${this.game.id}.zip`);
      });
    },
    loadImage: async function (url) {
      // This function accepts a url, returns a blob.
      return await fetch(url).then(r => { console.log(r); return r.blob() });
    },
    loadLocalForageFile: function () {
      return this.$vlf.getItem(`game.${this.gameId}.${this.answer.id}.image`).then((v) => {
        var blob = new Blob([v]);
        var imageURI = window.URL.createObjectURL(blob);
        this.loadedImage = imageURI;
        return this.$store.commit('updateImage', { imageURI: imageURI });
      });
    }
  }
}
</script>

<style scoped>
  .spacer-small {
    margin-right: 0.5em;
  }
  .game-badge {
    color: white;
    background-color: navy;
    display: flex;
    flex-direction: column;
    border: 3px solid grey;
    border-radius: 5px;
    padding: 1em;
    margin: 0.5em 1em;
    width: 25vw;
    justify-content: space-between;
    user-select: none;
  }
  .game-badge-heading {
    font-size: 18pt;
    font-weight: bold;
    color: white;
    text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
    display: flex;
    flex-direction: column;
    margin: 1em 0;
  }
  .game-badge-heading :nth-child(2) {
    font-size: 12pt;
    font-weight: normal;
  }
  .game-badge-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .game-badge-game-image {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 1em 0;
    height: 200px;
  }
  .game-badge-controls {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
