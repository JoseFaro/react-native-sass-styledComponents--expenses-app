import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance, getTokenHeaders } from '../../config/api';

export const addMovement = createAsyncThunk('movement/store', async (data, { getState, rejectWithValue }) => {
   try {
      const response = await apiInstance.get('movements/store', {
         headers: getTokenHeaders(getState().auth?.token),
         params: data,
      });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const getMovement = createAsyncThunk('movements/get', async (data, { getState, rejectWithValue }) => {
   try {
      const response = await apiInstance.get('movements/get', {
         headers: getTokenHeaders(getState().auth?.token),
         params: data,
      });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const getMovements = createAsyncThunk('movements', async (data, { getState, rejectWithValue }) => {
   try {
      const response = await apiInstance.get('movements', {
         headers: getTokenHeaders(getState().auth?.token),
         params: data,
      });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const updateMovement = createAsyncThunk('movements/update', async (data, { getState, rejectWithValue }) => {
   try {
      const response = await apiInstance.get('movements/update', {
         headers: getTokenHeaders(getState().auth?.token),
         params: data,
      });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});
