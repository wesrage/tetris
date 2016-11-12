import './index.html';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import { Game } from './components';

import './style/global.scss';

const target = document.getElementById('root');

const store = configureStore();

const component = (
   <Provider store={store}>
      <Game/>
   </Provider>
);

render(component, target);
