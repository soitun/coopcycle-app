import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import ReduxAsyncQueue from 'redux-async-queue';

import { persistStore } from 'redux-persist';

import Config from 'react-native-config';

import reducers from './reducers';
import GeolocationMiddleware from './middlewares/GeolocationMiddleware';
import BluetoothMiddleware from './middlewares/BluetoothMiddleware';
import HttpMiddleware from './middlewares/HttpMiddleware';
import NetInfoMiddleware from './middlewares/NetInfoMiddleware';
import PushNotificationMiddleware from './middlewares/PushNotificationMiddleware';
import SentryMiddleware from './middlewares/SentryMiddleware';
import { ringOnTaskListUpdated } from './Courier/taskMiddlewares';
import CentrifugoMiddleware from './middlewares/CentrifugoMiddleware';
import { filterExpiredCarts } from './Checkout/middlewares';
import SoundMiddleware from './middlewares/SoundMiddleware';
import { notifyOnNewOrderCreated } from './Restaurant/middlewares';

const middlewares = [
  thunk,
  ReduxAsyncQueue,
  NetInfoMiddleware,
  HttpMiddleware,
  PushNotificationMiddleware,
  CentrifugoMiddleware,
  SentryMiddleware,
  filterExpiredCarts,
  SoundMiddleware,
];

if (!Config.DEFAULT_SERVER) {
  middlewares.push(
    ...[
      GeolocationMiddleware,
      BluetoothMiddleware,
      notifyOnNewOrderCreated,
      ringOnTaskListUpdated,
    ],
  );
}

const middlewaresProxy = middlewaresList => {
  if (__DEV__) {
    return require('./middlewares/devSetup').default(middlewaresList);
  } else {
    return applyMiddleware(...middlewaresList);
  }
};

const store = createStore(reducers, middlewaresProxy(middlewares));

export default store;

export const persistor = persistStore(store);
