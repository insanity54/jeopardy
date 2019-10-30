import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Game from '@/components/Game';
import GameBoard from '@/components/GameBoard';
import AnswerScreen from '@/components/AnswerScreen';
import GameCreator from '@/components/GameCreator';
import GameList from '@/components/GameList/GameList';
import CategoryEditor from '@/components/CategoryEditor';
import TitleEditor from '@/components/TitleEditor';
import PlayerList from '@/components/PlayerList/PlayerList';
import EpisodeList from '@/components/EpisodeList/EpisodeList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/games',
      component: GameList
    },
    {
      path: '/game/new',
      component: GameCreator
    },
    {
      path: '/players',
      component: PlayerList
    },
    {
      path: '/episodes',
      component: EpisodeList
    },
    {
      path: '/game/:gameId',
      component: Game,
      children: [{
          path: '/',
          component: GameBoard
        },
        {
          path: 'answer',
          component: AnswerScreen
        },
        {
          path: 'category/:categoryIndex',
          component: CategoryEditor
        },
        {
          path: 'title/',
          component: TitleEditor
        },
      ]
    },
  ]
})
