import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './store/reducer';

export default function configureStore(initialState) {
   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
   const store = createStore(
      reducer,
      initialState,
      composeEnhancers(
         applyMiddleware(thunkMiddleware),
      ),
   );

   if (module.hot) {
      module.hot.accept(() => {
         const nextRootReducer = require('./store/reducer').default;
         store.replaceReducer(nextRootReducer);
      });
   }

   return store;
}
