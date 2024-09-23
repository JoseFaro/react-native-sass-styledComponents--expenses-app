import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, login, logout } from '../actions/authActions';
import { ErrorCodes } from '../../constants/errorCodes';

const initialState = {
   isAttemptingLogin: false,
   isLoggedIn: false,
   isLoggingOut: false,
   loginAttempted: false,
   token: undefined,
   user: undefined,
};

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      clearIsLoggingOut: (state) => {
         state.isLoggingOut = false;
      },
      clearValuesForLogin: (state) => {
         state.isAttemptingLogin = false;
         state.loginAttempted = false;
      },
      resetAuthState: (state) => {
         state.isAttemptingLogin = false;
         state.isLoggedIn = false;
         state.isLoggingOut = false;
         state.loginAttempted = false;
         state.token = undefined;
         state.user = undefined;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(checkLoginStatus.fulfilled, (state, { payload }) => {
         state.token = payload.token;
      });

      builder.addCase(checkLoginStatus.rejected, (state, { payload }) => {
         if (payload.statusError === ErrorCodes.UNAUTHORIZED) {
            state.isAttemptingLogin = false;
            state.isLoggedIn = false;
            state.isLoggingOut = false;
            state.loginAttempted = false;
            state.token = undefined;
            state.user = undefined;
         }
      });

      builder.addCase(login.pending, (state) => {
         state.isAttemptingLogin = true;
         state.loginAttempted = false;
      });

      builder.addCase(login.fulfilled, (state, { payload }) => {
         state.isAttemptingLogin = false;

         if (payload.success) {
            state.isLoggedIn = true;
            state.token = payload.token;
            state.user = payload.user;
         } else {
            state.loginAttempted = true;
         }
      });

      builder.addCase(login.rejected, (state) => {
         state.isAttemptingLogin = false;
         state.loginAttempted = true;
      });

      builder.addCase(logout.pending, (state) => {
         state.isLoggingOut = true;
      });

      builder.addCase(logout.fulfilled, (state) => {
         state.isAttemptingLogin = false;
         state.isLoggedIn = false;
         state.isLoggingOut = false;
         state.loginAttempted = false;
         state.user = undefined;
         state.token = undefined;
      });

      builder.addCase(logout.rejected, (state, { payload }) => {
         state.isLoggingOut = false;

         if (payload.statusError === ErrorCodes.UNAUTHORIZED) {
            state.isAttemptingLogin = false;
            state.isLoggedIn = false;
            state.loginAttempted = false;
            state.token = undefined;
            state.user = undefined;
         }
      });
   },
});

export const { clearIsLoggingOut, clearValuesForLogin, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
