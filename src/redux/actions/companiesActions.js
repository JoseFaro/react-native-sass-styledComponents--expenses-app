import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance, getTokenHeaders } from '../../config/api';

export const addCompany = createAsyncThunk('companies/store', async (data, { getState, rejectWithValue }) => {
   try {
      const response = await apiInstance.get('companies-users/store', {
         headers: getTokenHeaders(getState().auth?.token),
         params: data,
      });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const getCompany = createAsyncThunk('companies/get', async (data, { getState, rejectWithValue }) => {
   try {
      const response = await apiInstance.get('companies-users/get', {
         headers: getTokenHeaders(getState().auth?.token),
         params: data,
      });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const getCompanies = createAsyncThunk('companies-users', async (data, { getState, rejectWithValue }) => {
   try {
      const response = await apiInstance.get('companies-users', {
         headers: getTokenHeaders(getState().auth?.token),
         params: data,
      });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const updateCompanyInvitationStatus = createAsyncThunk(
   'companies/update-invitation-status',
   async (data, { getState, rejectWithValue }) => {
      try {
         const response = await apiInstance.post(
            `companies-users/update-invitation-status/${data.id}`,
            {
               isAccepted: data.isAccepted,
            },
            {
               headers: getTokenHeaders(getState().auth?.token),
            },
         );
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const updateCompany = createAsyncThunk('companies/update', async (data, { getState, rejectWithValue }) => {
   try {
      const response = await apiInstance.get('companies-users/update', {
         headers: getTokenHeaders(getState().auth?.token),
         params: data,
      });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});
