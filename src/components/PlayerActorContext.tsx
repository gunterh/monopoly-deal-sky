import { createActorContext } from '@xstate/react';
import { Actor, assign, createMachine } from 'xstate';

const playerMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgWgFt0BjACwEsA7MAOnIjFQGIBlAUQBk2BhAFQH0AChwCCATTYAlANoAGALqIUAe1jkALuWWUlIAB6IALACYas8xcsWAjABoQmRAA5rNQwFYbANifHj12R8AXxD7SmUGeCQQNCxcQhIKal1kVQ0tHWiDBDx3GgBOQqLi4oBme0ccr1CYjGx8IjIqWnpGFLTNbV1sgHZXQuNSrx93L0Nhp3yKxGtfGnce82N3Qyd3UsNSpycQkKA */
  id: 'player-machine',
  initial: 'idel',
  context: {},
  states: {
    idel: {
      on: {
        SELECT_PLAYER: {
          actions: assign({
            selectedPlayer: ({ event }) => event.player,
          }),
        },
        SET_PLAYER_NAME: {
          actions: assign({
            playerName: ({ event }) => event.playerName,
            selectedPlayer: ({ event }) => event.playerName,
          }),
        },
      },
    },
  },
  types: {
    context: {} as {
      selectedPlayer?: string;
      playerName?: string;
    },
    events: {} as
      | {
          type: 'SELECT_PLAYER';
          player: string;
        }
      | {
          type: 'SET_PLAYER_NAME';
          playerName: string;
        },
  },
});

export type PlayerActor = Actor<typeof playerMachine>;

export const PlayerActorContext = createActorContext(playerMachine);
