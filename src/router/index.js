import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Game from '@/components/Game';
import AnswerScreen from '@/components/AnswerScreen';
import GameCreator from '@/components/GameCreator';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/game/new', component: GameCreator },
    { path: '/game/:gameId', component: Game },
    { path: '/game/:gameId/answer', component: AnswerScreen },
  ]
})
