import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './store/reducers';

export default function configureStore(initialState) {
   const store = createStore(
      reducers,
      initialState,
      compose(
         applyMiddleware(thunkMiddleware),
         window.devToolsExtension && window.devToolsExtension()
      )
   );

   if (module.hot) {
      module.hot.accept(() => {
         const nextRootReducer = require('./store/reducers/index').default;
         store.replaceReducer(nextRootReducer);
      });
   }

   return store;
}
