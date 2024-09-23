import { createSlice } from '@reduxjs/toolkit';
import { addMovement, getMovement, getMovements, updateMovement } from '../actions/movementsActions';

const initialState = {
   isAdding: false,
   isUpdating: false,
   pagination: {
      currentPage: 1,
      from: 0,
      pages: 1,
      perPage: 20,
      to: 0,
      total: 0,
   },
   movement: undefined,
   movements: [],
};

export const movementsSlice = createSlice({
   name: 'movements',
   initialState,
   reducers: {
      clearMovement: (state) => {
         state.movement = undefined;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addMovement.pending, (state) => {
         state.isAdding = true;
      });

      builder.addCase(addMovement.fulfilled, (state) => {
         state.isAdding = false;
      });

      builder.addCase(addMovement.rejected, (state) => {
         state.isAdding = false;
      });

      builder.addCase(updateMovement.pending, (state) => {
         state.isUpdating = true;
      });

      builder.addCase(updateMovement.fulfilled, (state) => {
         state.isUpdating = false;
      });

      builder.addCase(updateMovement.rejected, (state) => {
         state.isUpdating = false;
      });

      builder.addCase(getMovement.fulfilled, (state, { payload }) => {
         state.movement = payload.movement;
      });

      builder.addCase(getMovements.fulfilled, (state, { payload }) => {
         const pages = payload.movements.total > 0 ? Math.ceil(payload.movements.total / payload.movements.per_page) : 1;

         state.pagination = {
            currentPage: payload.movements.current_page,
            from: payload.movements.from || 0,
            pages: pages,
            perPage: payload.movements.per_page,
            to: payload.movements.to || 0,
            total: payload.movements.total,
         };
         state.movements = payload.movements.data;
      });
   },
});

export const { clearMovement } = movementsSlice.actions;

export default movementsSlice.reducer;
