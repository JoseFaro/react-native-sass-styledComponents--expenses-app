import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance, getHeaders } from '../../config/api';

export const checkLoginStatus = createAsyncThunk('auth/checkLoginStatus', async (data, { getState, rejectWithValue }) => {
   try {
      const response = await apiInstance.get('auth/checkLoginStatus', getHeaders(getState().auth?.token));
      return response.data;
   } catch (error) {
      return rejectWithValue({ statusError: error.toJSON().status });
   }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
   try {
      const response = await apiInstance.post('auth/login', data);
      return response.data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const logout = createAsyncThunk('auth/logout', async (data, { getState, rejectWithValue }) => {
   try {
      await apiInstance.get('auth/logout', getHeaders(getState().auth?.token));
      return;
   } catch (error) {
      return rejectWithValue({ statusError: error.toJSON().status });
   }
});
