import Vue from 'vue';
import Vuex from 'vuex';
import game from './modules/game';
import games from './modules/games';
import players from './modules/players';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        game,
        games,
        players
    },
    strict: true
})
