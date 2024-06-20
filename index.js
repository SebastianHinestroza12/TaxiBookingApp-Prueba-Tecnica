import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import App from './App';
import { name as appName } from './app.json';

const RestaurantApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RestaurantApp);
