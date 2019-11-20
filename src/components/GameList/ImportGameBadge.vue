<template>
<div class="import-game-badge">
  <div class="import-game-badge-heading">
    Import a Game
  </div>
  <div class="import-game-badge-content">
    <input @change="onChangeInputFile" id="game-import" type="file" />
    <div class="debug">
      <ul>
        <li v-for="d in dats" :key="d[0]">
          <img :src="d" :alt="d" />
        </li>
      </ul>
    </div>
    <div class="white-text">
      <i class="material-icons">import_export</i><span>Import Game Zip</span>
    </div>
    <ErrorHandler :error="error" :success="success"/>
  </div>
</div>
</template>

<script>
let maxSize = 15728640;
import * as Promise from "bluebird";
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler';
import JSZip from 'jszip';
export default {
  name: 'ImportGameBadge',
  components: {
    ErrorHandler
  },
  data: function () {
    return {
      gameType: 'single',
      dats: [],
      error: new Error(),
      success: {},
    }
  },
  props: {},
  computed: {
    gameId: function() {
      return this.$store.state.game.game.id;
    }
  },
  methods: {
    logError: function(e) {
      this.error = e;
    },
    validateFile: function(f) {
      return new Promise((resolve, reject) => {
        // ensure file size is acceptable
        if (f.size > maxSize) {
          reject({
            code: 'max_size_exceeded',
            message: `File max size exceded, upload a file smaller than ${maxSize}`
          });
        }
        // ensure file type is acceptable @TODO
        if (f.type !== 'application/zip') {
          reject({
            code: 'wrong_filetype',
            message: `filetype ${f.type} is invalid. Please import a file of type application/zip`
          })
        }
        resolve(f);
      });
    },
    /**
     * Load the zip file contents into memory
     */
    loadFile: function(f) {
      return JSZip.loadAsync(f);
    },
    importFile: function(f) {
      return this.validateFile(f)
        .then(this.loadFile)
        .then(this.gatherGameData)
        .then(this.parseGameData)
        .then(this.validateGameData)
        .then(this.regenerateImageUrls)
        .then(this.updateGameJsonImages)
        .then(this.createImportedGame)
        .then(this.storeGameData)
        .then(this.displaySuccess)
        .catch(this.displayError)
    },
    debug: function (gameData) {
      console.log(`answer [10] image URL => ${gameData.gameJson.answers[10].image.url}`)
      return gameData
    },
    createImportedGame: function (gameData) {
      // store game.json in vuex
      this.$store.commit('createGame', gameData.gameJson);
      return gameData;
    },
    /**
     * Put the regenerated image urls in the game data
     */
    updateGameJsonImages: function (gameData) {
      for (var i=0; i<gameData.gameAssetJson.length; i++) {
        let image = gameData.gameAssetJson[i];
        let matchingAnswer = gameData.gameJson.answers.find((a) => {
          return (a.image.id === image.id)
        })
        matchingAnswer.image.url = image.url;
      }
      return gameData;
    },
    /**
     * - generates image URL from blob.
     */
    regenerateImageUrls: function (gameData) {
      let generateUrl = (blob) => window.URL.createObjectURL(blob)
      for (var i=0; i<gameData.gameAssets.length; i++) {
        let blob = gameData.gameAssets[i];
        gameData.gameAssetJson[i].url = generateUrl(blob);
      }
      return gameData;
    },
    parseGameData: function (gameData) {
      gameData.gameJson = JSON.parse(gameData.gameJson);
      gameData.gameAssetJson = JSON.parse(gameData.gameAssetJson);
      return gameData;
    },
    displayError: function (error) {
      this.success = {};
      this.error = error;
    },
    /**
     * Show the user that the import was successful
     */
    displaySuccess: function (gameData) {
      let gameName = gameData.gameJson.name;
      this.error = new Error();
      this.success = { code: 'all_good_m8', message: `${gameName} imported successfully` };
    },
    /**
     * Ensure game and asset data fetched from .zip file is valid
     */
    validateGameData: function (gameData) {
      return new Promise((resolve, reject) => {
        if (typeof gameData.gameJson === 'undefined') {
          reject(new Error (
            'The game being imported does not contain game data, which is required.'
          ))
        }
        if (typeof gameData.gameAssetJson === 'undefined') {
          reject(new Error (
            'The game being imported does not contain asset data, which is required.'
          ))
        }
        let gameId = gameData.gameJson.id;
        let match = this.$store.state.game.games.find((g) => g.id === gameId);
        if (typeof match !== 'undefined') {
          reject(new Error (
            'The game being imported has the same ID as a game which already exists. IDs must be unique.'
          ))
        }
        resolve(gameData);
      });
    },
    /**
     * Save the game data to vuex, and the image data to vuex and localforage
     */
    storeGameData: function (gameData) {
      console.log(gameData);

      // store assets/*.(jpg|png|gif) in localForage
      let promises = [];
      for (var i=0; i<gameData.gameAssets.length; i++) {
        promises.push(this.storeAssetInBrowser({
          id: gameData.gameAssetJson[i].id,
          type: gameData.gameAssetJson[i].type,
          gameId: this.gameId,
          blob: gameData.gameAssets[i]
        }));
      }
      return {
        ...gameData,
        storageResult: Promise.all(promises)
      };
    },
    /**
     * Handle the contents of the zip file being imported.
     *
     * @param {Array} zip - array containing zip folder contents
     * @return {Promise} result
     */
    gatherGameData: function (zip) {
      const isGameJson = (f) => {
        if (f.name.endsWith('.json') && !f.name.startsWith('assets/'))
          return true;
        return false;
      }
      const isGameAssetJson = (f) => {
        return (f.name === 'assets/assets.json') ? true : false;
      }
      const isGameAsset = (f) => {
        return /assets\/\d{2}.(jpg|gif|png)/.test(f.name);
      }

      let gameJson, gameAssetJson = {};
      let gameAssets = [];
      zip.forEach((relativePath, file) => {
        if (isGameJson(file)) gameJson = file.async('text');
        if (isGameAssetJson(file))
          gameAssetJson = file.async('text');
        if (isGameAsset(file)) gameAssets.push(file.async('blob'));
      });

      let gameData = {
        gameJson,
        gameAssetJson,
        gameAssets: Promise.all(gameAssets)
      };

      return new Promise.props(gameData);
    },
    onChangeInputFile: function (e) {
      // greetz
      // https://github.com/dflourusso/v-file-upload/blob/master/src/FileUpload.vue
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return
      for (var i = 0; i < files.length; i++) {
        this.importFile(files[i]);
      }
    },
    /**
     * Store an image in the browser's LocalStorage via LocalForage
     * @param options
     * @param {String} options.url - URL of the image to be stored
     * @param {String} options.id - ID/Name of the image. Same as answerID.
     *                              Example: "02" for category 0, answer 2
     * @param {String} options.gameId - Game ID of which the image belongs to
     * @param {String} options.type - image type. (png|jpg|gif)
     * @return {Promise} imageObject - the imageData object stored in
     *                                 localForage
     */
    storeAssetInBrowser: function({
      blob,
      id,
      gameId,
      url
    }) {
      // name should be `${gameId}.${answerId}`
      console.log(`storing ${blob} (${id}) locally`);
      let imageObject = {
        blob,
        id,
        gameId,
        url
      }
      return this.$vlf.setItem(`game.${gameId}.${id}.image`, imageObject);
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
