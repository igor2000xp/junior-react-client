import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocalBasket, localBasketItemInit } from '../UI/pages/common-models';
// import { State } from './store';
import { ICartState } from '../UI/pages/common-models/state-models';



const initialState:ICartState = {
  cart: [localBasketItemInit],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addBasket: (state, action: PayloadAction<ILocalBasket>) => {
    //   state.push(action.payload);
    // },
    renewBasket: (state, actions: PayloadAction<ILocalBasket[]>) => {
      state.cart = [];
      state.cart = [...actions.payload];
    },
  },
});

export const { actions, reducer } = cartSlice;
export const { renewBasket } = actions; // cartSlice.actions
export default reducer; // cartSlice.reducer
