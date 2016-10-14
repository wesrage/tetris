require('./index.html');
import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import './style/global.scss';

const target = document.getElementById('root');

const store = configureStore();

const component = (
   <Provider store={store}>
      <Router routes={routes} history={browserHistory}/>
   </Provider>
);

render(component, target);
