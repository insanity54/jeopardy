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
      <div class="game-badge-status">
        <p>{{ error.msg }}</p>
        <p>{{ success.msg }}</p>
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
        <div @click="uploadGame" class="button">
          <i class="material-icons">cloud_upload</i>Upload
        </div>
        <div @click="exportGame" class="button">
          <i class="material-icons">file_download</i>Download
        </div>
        <div @click="deleteGame" class="button">
          <i class="material-icons">delete</i>Delete
        </div>
      </div>
        <div class="game-badge-color-chooser">
        </div>
      <ErrorHandler v-if="false" :error="error" :success="success"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as Promise from 'bluebird';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler';
import Avatar from '@/components/Avatar/Avatar';
export default {
  name: 'GameBadge',
  components: {
    Avatar,
    ErrorHandler
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      error: new Error('yolo'),
      success: {}
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
    uploadGame: function () {
      this.prepareZip()
      .then((zipContent) => {
        return axios
          .post('/api/v1/game/upload', { payload: zipContent } )
      })
      .then((idk) => {
        console.log(idk);
        this.success = { msg: 'the upload was successful.' };
      })
      .catch((e, idk) => {
        console.log(idk);
        this.error = e;
      })
      .finally((res) => {
        console.log(res);
        this.success = res;
      })
    },
    prepareZip: function () {
      let zip = new JSZip();
      zip.file(`${this.game.id}.json`, JSON.stringify(this.game));
      let assets = zip.folder('assets');
      // create assets.json which contains image name, type, and url.
      let assetsData = [];
      return this.refreshBlobUrls().then(() => {
        for (var i=0; i<this.game.answers.length; i++) {
          // loop through images and add them to the zip
          let answer = this.game.answers[i];
          if (typeof answer.image.url !== 'undefined') {
            let { type, id, url } = answer.image;
            assetsData.push({ type, id, url });
            let imgBlob = this.getBlobUrl(url);
            assets.file(`${answer.id}.${type}`, imgBlob);
          }
        }
        assets.file(`assets.json`, JSON.stringify(assetsData));
        return zip.generateAsync({
          type: "base64",
          compression: "DEFLATE",
          comment: "Play Jepurdee at https://xtoast.com/"
        })
      });
    },
    deleteGame: function () {
      this.$store.commit('deleteGame', { id: this.game.id });
    },
    goToGame: function () {
      if (this.isEditMode) this.$store.commit('leaveEditMode');
      this.$store.commit('loadGame', this.game.id);
      this.$router.push(this.gameLink);
      this.$socket.emit('shareGame', this.game);
      this.$socket.emit('routeToScreen', { screenName: 'game', id: this.game.id });
    },
    restartGame: function () {
      this.$store.commit('restartGame', this.game.id);
      this.$store.commit('resetScores');
      this.$socket.emit('restartGame');
    },
    goToGameEditor: function() {
      if (!this.isEditMode) this.$store.commit('enterEditMode');
      this.$store.commit('loadGame', this.game.id);
      this.$router.push(this.gameLink);
    },
    normalizeName: function (name) {
      return name.toLowerCase().replace(/ /g, '-');
    },
    exportGame: function () {
      // console.log(`name:${this.game}`)
      this.prepareZip().then((content) => {
        saveAs(content, `${this.normalizeName(this.game.name)}.zip`);
      }).then((res) => {
        this.success = res;
      });
    },
    refreshBlobUrls: function () {
      // Goes through each image in the game, and re-generates it's URL.
      // then, the image.url property (vuex) is updated.
      // This is required because the blob URL will become invalid
      // after certain events such as closing the window.
      return new Promise.each(this.game.answers, (a) => {
        if (typeof a.url === 'undefined') return null;
        return this.getBlobUrl(this.game.id, a.id).then((url) => {
          return this.updateVuexImageUrl(this.game.id, a.id, url);
        })
      });
    },
    getBlobUrl: function (gameId, answerId) {
      return this.$vlf.getItem(`game.${gameId}.${answerId}.image`).then((v) => {
        var blob = new Blob([v]);
        return window.URL.createObjectURL(blob);
      })
    },
    getBlobFromUrl: async function (url) {
      return await fetch(url).then(r => r.blob());
    },
    updateVuexImageUrl: function (gameId, answerId, imageUrl) {
      this.$store.commit('updateImage', { gameId, answerId, imageUrl });
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
  .game-badge-controls .button {
    background-color: purple;
  }
</style>
