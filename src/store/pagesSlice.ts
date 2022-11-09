import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPagesState {
  page: string;
}
const initialState: IPagesState = {
  page: 'all',
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPage: (state, actions: PayloadAction<string>) => {
      state.page = actions.payload;
    },
  },
});

export const { actions, reducer } = pagesSlice;
export const { setPage } = actions;
export default reducer; // pagesSlice.reducer
