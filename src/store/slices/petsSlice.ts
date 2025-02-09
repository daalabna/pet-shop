import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { petApi } from '../../services/api';
import type { PetsState } from '../../types/store';
import { Pet } from '../../api/petstore';

const initialState: PetsState = {
  pets: [],
  selectedPet: null,
  loading: false,
  error: null,
};

export const fetchPetsByStatus = createAsyncThunk(
  'pets/fetchByStatus',
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await petApi.findByStatus(status);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pets');
    }
  }
);

export const fetchPetById = createAsyncThunk(
  'pets/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await petApi.getPetById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pet');
    }
  }
);

export const addPet = createAsyncThunk(
  'pets/add',
  async (pet: Partial<Pet>, { rejectWithValue }) => {
    try {
      const response = await petApi.addPet(pet as Pet);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add pet');
    }
  }
);

export const deletePet = createAsyncThunk(
  'pets/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await petApi.deletePet(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete pet');
    }
  }
);

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetsByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetsByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPetsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPet = action.payload;
      })
      .addCase(fetchPetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = state.pets.filter(pet => pet.id !== action.payload);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default petsSlice.reducer;