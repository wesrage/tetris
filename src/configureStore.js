import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './store/reducer';

export default function configureStore(initialState) {
   const store = createStore(
      reducer,
      initialState,
      compose(
         applyMiddleware(thunkMiddleware),
         window.devToolsExtension && window.devToolsExtension()
      )
   );

   if (module.hot) {
      module.hot.accept(() => {
         const nextRootReducer = require('./store/reducer').default;
         store.replaceReducer(nextRootReducer);
      });
   }

   return store;
}
