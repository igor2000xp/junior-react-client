import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currencyReducer from '../UI/pages/common/headerCurrencySlice';

// export const store = configureStore({
//   reducer: {
//     currency: currencySlice,
//   },
// });

const reducer = combineReducers({
  currency: currencyReducer,
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
