import { createSlice } from '@reduxjs/toolkit';
import { getCompanies, getCompany, updateCompanyInvitationStatus, updateCompany } from '../actions/companiesActions';

const initialState = {
   companies: [],
   company: undefined,
   currentCompany: undefined,
   hasCompanies: false,
   isInvitationAccepted: false,
   isInvitationDenied: false,
   isUpdating: false,
   isUpdatingInvitationOfCompany: false,
};

export const companiesSlice = createSlice({
   name: 'companies',
   initialState,
   reducers: {
      clearCompanies: (state) => {
         state.companies = [];
      },
      clearCompany: (state) => {
         state.company = undefined;
      },
      clearCurrentCompany: (state) => {
         state.currentCompany = undefined;
      },
      clearInvitationStatus: (state) => {
         state.isInvitationAccepted = false;
         state.isInvitationDenied = false;
         state.isUpdatingInvitationOfCompany = false;
      },
      setCompanies: (state, { payload }) => {
         state.companies = payload;
         state.hasCompanies = payload && payload.length;
      },
      setCurrentCompany: (state, { payload }) => {
         state.currentCompany = payload;
      },
      resetCompaniesState: (state) => {
         state.companies = [];
         state.company = undefined;
         state.currentCompany = undefined;
         state.hasCompanies = false;
         state.isInvitationAccepted = false;
         state.isInvitationDenied = false;
         state.isUpdating = false;
         state.isUpdatingInvitationOfCompany = false;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getCompanies.fulfilled, (state, { payload }) => {
         const hasCompanies = payload.companies && payload.companies.length;

         state.companies = payload.companies;
         state.hasCompanies = hasCompanies;

         if (hasCompanies && state.currentCompany) {
            const newCurrentCompany = payload.companies.find((company) => company.id === state.currentCompany.id);
            state.currentCompany = newCurrentCompany || undefined;
         }
      });

      builder.addCase(updateCompany.pending, (state) => {
         state.isUpdating = true;
      });

      builder.addCase(updateCompany.fulfilled, (state) => {
         state.isUpdating = false;
      });

      builder.addCase(updateCompany.rejected, (state) => {
         state.isUpdating = false;
      });

      builder.addCase(updateCompanyInvitationStatus.pending, (state) => {
         state.isInvitationAccepted = false;
         state.isInvitationDenied = false;
         state.isUpdatingInvitationOfCompany = true;
      });

      builder.addCase(updateCompanyInvitationStatus.fulfilled, (state, { payload }) => {
         state.isInvitationAccepted = !!payload.isAccepted;
         state.isInvitationDenied = !!payload.isDenied;
         state.isUpdatingInvitationOfCompany = false;
      });

      builder.addCase(updateCompanyInvitationStatus.rejected, (state) => {
         state.isUpdatingInvitationOfCompany = false;
      });

      builder.addCase(getCompany.fulfilled, (state, { payload }) => {
         state.company = payload.company;
      });
   },
});

export const {
   clearCompanies,
   clearCompany,
   clearCurrentCompany,
   clearInvitationStatus,
   setCompanies,
   setCurrentCompany,
   resetCompaniesState,
} = companiesSlice.actions;

export default companiesSlice.reducer;
