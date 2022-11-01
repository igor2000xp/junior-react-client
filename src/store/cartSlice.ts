import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocalBasket, localBasketItemInit } from '../UI/pages/common-models';
import { ICartState } from '../UI/pages/common-models/state-storage-models';



const initialState:ICartState = {
  cart: [localBasketItemInit],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    renewBasket: (state, actions: PayloadAction<ILocalBasket[]>) => {
      state.cart = [];
      state.cart = [...actions.payload];
    },
  },
});

export const { actions, reducer } = cartSlice;
export const { renewBasket } = actions; // cartSlice.actions
export default reducer; // cartSlice.reducer
