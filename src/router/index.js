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
import PlayerList from '@/components/Player/PlayerList';
import EpisodeList from '@/components/EpisodeList/EpisodeList';
import PlayerBadge from '@/components/Player/PlayerBadge';
import NewPlayerCreator from '@/components/Player/NewPlayerCreator';
import Kicked from '@/components/Jail/Kicked';
import PlayerBuzzer from '@/components/Player/PlayerBuzzer';
import PlayerController from '@/components/Player/PlayerController';
import HostController from '@/components/Host/HostController';
import HostSetup from '@/components/Host/HostSetup';
import HostQuestion from '@/components/Host/HostQuestion';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/kicked',
      component: Kicked
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
      path: '/player/new',
      component: NewPlayerCreator
    },
    {
      path: '/player/:playerId',
      component: PlayerController,
      children: [{
          path: '/',
          component: PlayerBadge,
          props: true
        },
        {
          path: 'buzzer',
          component: PlayerBuzzer
        },
      ]
    },
    {
      path: '/host',
      component: HostController,
      children: [{
          path: '/',
          component: HostSetup,
        },
        {
          path: 'question',
          component: HostQuestion
        }
      ]
    },
    {
      path: '/game/:gameId',
      component: Game,
      children: [
        {
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
