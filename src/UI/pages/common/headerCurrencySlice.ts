import { SymbolCurrency } from '../common-models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { store } from '../../../store/store';

export interface CurrencyState {
  // label: Label;
  symbol: SymbolCurrency;
}

const initialState: CurrencyState = {
  // label: Label.Usd,
  symbol: SymbolCurrency.SymbolUsd,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
     setCurrency: (state, action: PayloadAction<SymbolCurrency>) => {
       state.symbol = action.payload;
     },
  }
});

export const { actions, reducer } = currencySlice;
export const { setCurrency } = actions;
export default reducer;

// export const { setCurrency } = currencySlice.actions;
// export  default currencySlice.reducer;
// export type State = ReturnType<typeof currencySlice.reducer>;
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type CurrencyState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
