import { createAction } from '@reduxjs/toolkit';
import { updateTask } from '../../Dispatch/actions';

export const CENTRIFUGO_MESSAGE = '@centrifugo/MESSAGE';

export const connect = createAction('@centrifugo/CONNECT');
export const disconnect = createAction('@centrifugo/DISCONNECT');

export const connected = createAction('@centrifugo/CONNECTED');
export const disconnected = createAction('@centrifugo/DISCONNECTED');

export const _message = createAction(CENTRIFUGO_MESSAGE);

export function message(payload) {
  return function (dispatch, getState) {
    if (payload.name && payload.data) {
      const { name, data } = payload;

      switch (name) {
        case 'task:created':
        case 'task:cancelled':
        case 'task:assigned':
        case 'task:unassigned':
        case 'task:started':
        case 'task:done':
        case 'task:failed':
        case 'task:updated':
          dispatch(updateTask(name, data.task));
          break;
        default:
          dispatch(_message(payload));
          break;
      }
    } else {
      dispatch(_message(payload));
    }
  };
}
