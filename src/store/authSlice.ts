import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  usuario: string | null;
  logado: boolean;
};

const initialState: AuthState = {
  usuario: null,
  logado: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.usuario = action.payload;
      state.logado = true;
    },

    logout: (state) => {
      state.usuario = null;
      state.logado = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;