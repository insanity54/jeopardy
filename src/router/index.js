import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Game from '@/components/Game/Game';
import GameBoardOrFinal from '@/components/Game/GameBoardOrFinal';
import AnswerScreen from '@/components/Game/AnswerScreen';
import GameCreator from '@/components/Game/GameCreator';
import GameList from '@/components/GameList/GameList';
import CategoryEditor from '@/components/Game/CategoryEditor';
import TitleEditor from '@/components/Game/TitleEditor';
import PlayerList from '@/components/Player/PlayerList';
import EpisodeList from '@/components/EpisodeList/EpisodeList';
import PlayerBadge from '@/components/Player/PlayerBadge';
import PlayerJoin from '@/components/Player/PlayerJoin';
import NewPlayerCreator from '@/components/Player/NewPlayerCreator';
import Kicked from '@/components/Player/Kicked';
import PlayerBuzzer from '@/components/Player/PlayerBuzzer';
import PlayerController from '@/components/Player/PlayerController';
import HostSetup from '@/components/Host/HostSetup';
import HostBuzzerTest from '@/components/Host/HostBuzzerTest';
import NewHostCreator from '@/components/Host/NewHostCreator';
import BuzzerTest from '@/components/BuzzerTest/BuzzerTest';
import Settings from '@/components/Settings/Settings';
import GameHostBoardOrFinalControls from '@/components/Controls/GameHostBoardOrFinalControls';
import GameHostAnswerControls from '@/components/Controls/GameHostAnswerControls';
import Sidebar from '@/components/Game/Sidebar';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/buzzerTest',
      component: BuzzerTest
    },
    {
      path: '/settings',
      component: Settings
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
      path: '/player/join',
      component: PlayerJoin
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
      path: '/host/setup',
      component: HostSetup,
    },
    {
      path: '/host/new',
      component: NewHostCreator
    },
    {
      path: '/host/buzzerTest',
      component: HostBuzzerTest
    },
    {
      path: '/game/:gameId',
      component: Game,
      children: [
        {
          path: '/',
          components: {
            default: GameBoardOrFinal,
            sidebar: Sidebar,
            controls: GameHostBoardOrFinalControls
          }
        },
        {
          path: 'answer',
          components: {
            default: AnswerScreen,
            sidebar: Sidebar,
            controls: GameHostAnswerControls
          }
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
