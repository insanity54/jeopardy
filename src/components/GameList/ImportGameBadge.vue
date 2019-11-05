<template>
  <div class="import-game-badge">
    <div class="import-game-badge-heading">
      Import a Game
    </div>
    <div class="import-game-badge-content">
      <input @change="onChangeInputFile" id="game-import" type="file"/>
      <div class="debug">
        <ul>
          <li v-for="d in dats" :key="d[0]">
            <img :src="d" :alt="d"/>
          </li>
        </ul>
      </div>
      <div @click="importGame" class="button white-text">
        <i class="material-icons">import_export</i><span>Import Game Zip</span>
      </div>
    </div>
  </div>
</template>

<script>
import { basename } from '@/util/util.js'
import JSZip from 'jszip';
export default {
  name: 'ImportGameBadge',
  components: {
  },
  data: function () {
    return {
      gameType: 'single',
      dats: [],
    }
  },
  props: {
  },
  computed: {
    gameId: function () {
      return this.$store.state.game.game.id;
    }
  },
  methods: {
    createGame: function () {
      this.$store.commit('createGame', { gameType: this.gameType });
    },
    importGame: function () {
      this.$store.commit('createGame', { gameType: this.gameType });
      // return this.$vlf.getItem(`game:${this.gameId}:${this.answer.id}:image`).then((v) => {
      //   var blob = new Blob([v]);
      //   var imageURI = window.URL.createObjectURL(blob);
      //   this.loadedImage = imageURI;
      //   return this.$store.commit('updateImage', { imageURI: imageURI });
      // });
    },
    handleFile: function(f) {
      let maxSize = 15728640;
      if (f.size > maxSize) {
        this.$emit('error', {
          code: 'max_size_exceeded',
          message: `File max size exceded, upload a file smaller than ${maxSize}`
        })
        return;
      }
      return JSZip.loadAsync(f).then((zip) => {
        zip.forEach((relativePath, zipEntry) => {
          if (zipEntry.name.endsWith('.json')) {
            zipEntry.async('text').then((text) => {
              let gameData = JSON.parse(text);
              this.$store.commit('createGame', gameData);
            })
          } else if (zipEntry.name.endsWith('/')) {
            // skip the folders
            return;
          } else {
            // convert images to blobs, store them in localforage, generate URL.
            zipEntry.async('blob').then((blob) => {
              var imageURI = window.URL.createObjectURL(blob);
              console.log(this.$store.state.game.games)
              let gid = this.$store.state.game.games[
                this.$store.state.game.games.length-1
              ].id;
              this.storeLocally({
                url: imageURI,
                name: basename(zipEntry.name),
                gameId: gid
              });
            });
          }
        })
      });
    },

    onChangeInputFile: function (e) {
      // greetz
      // https://github.com/dflourusso/v-file-upload/blob/master/src/FileUpload.vue
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return
      for (var i=0; i<files.length; i++) {
        this.handleFile(files[i]);
      }
    },
    storeLocally: function ({ url, name, gameId }) {
      // name should be `${gameId}.${answerId}`
      console.log(`storing ${url} (${name}) locally`);
      return new Response(url).arrayBuffer().then((buffer) => {
        return this.$vlf.setItem(`game.${gameId}.${name}.image`, buffer).then(function(image) {
          var blob = new Blob([image]);
          var imageURI = window.URL.createObjectURL(blob);
          return imageURI;
        });
      })
    }
  }
}
</script>

<style scoped>
  .debug img {
    width: 50px;
  }
  .import-game-badge-button {
    width: 50px;
  }
  .import-game-badge {
    user-select: none;
    background-color: LightSkyBlue;
    display: flex;
    flex-direction: column;
    border: 3px solid grey;
    border-radius: 5px;
    padding: 1em;
    color: black;
    width: 25vw;
    margin: 0.5em 1em;
  }
  .white-text {
    color: white;
  }
  .import-game-badge-heading {
    font-size: 18pt;
    font-weight: bold;
    color: white;
    text-shadow: 3px 3px 5px black, 3px 3px 5px black, 3px 3px 5px black;
    display: flex;
    flex-direction: row;
    margin: 1em 0;
  }
  .import-game-badge-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .import-game-badge-selection p {
    margin-bottom: 1em;
  }
</style>
