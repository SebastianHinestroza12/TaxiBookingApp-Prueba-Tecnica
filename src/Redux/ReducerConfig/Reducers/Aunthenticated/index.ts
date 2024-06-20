import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../../../interfaces';

const initialState: AuthState = {
  users: [
    {
      id: 1,
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin12345',
      age: 30,
      phoneNumber: '3254783409',
    },
    {
      id: 2,
      name: 'Uzbe Driver',
      email: 'uzbe@gmail.com',
      password: 'uzbe12345',
      age: 45,
      phoneNumber: '3218569032',
    },
  ],
  authenticated: false,
};

const AuthenticatedSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
  },
});

export const {setAuthenticated} = AuthenticatedSlice.actions;
export default AuthenticatedSlice.reducer;
