import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currencySlice';
import cartReducer from './cartSlice';
import pagesSlice from './pagesSlice';

// export const store = configureStore({
//   reducer: {
//     currency: currencySlice,
//   },
// });

const reducer = combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
  pages: pagesSlice,
});

export const store = configureStore({
  reducer,
});

// const reducer = combineReducers({
//   reducer: currencyReducer,
// });
// export default store;
export type State = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
