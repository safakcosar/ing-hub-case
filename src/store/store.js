import { configureStore, createSlice } from '@reduxjs/toolkit';
import { mockData } from '../lib/mock-data.js';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: mockData,
    currentPage: 1,
    searchTerm: '',
    view: 'table',
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) state.employees[index] = action.payload;
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter((e) => e.id !== action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = 1;
      if (action.payload > 0) {
        state.currentPage = action.payload;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    reset: (state) => {
      state.employees = [...mockData];
      state.currentPage = 1;
      state.searchTerm = '';
      state.view = 'table';
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, setCurrentPage, setSearchTerm, setView, reset } = employeeSlice.actions;

export const store = configureStore({
  reducer: employeeSlice.reducer,
});

window.store = store;