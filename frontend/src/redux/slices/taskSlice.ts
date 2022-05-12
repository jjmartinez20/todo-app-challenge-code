import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

const array: any[] = [];
const initialState = {
  data: array
}

let fetch: boolean = false;

const setToken = () => {
  const tkn = sessionStorage.getItem('TKN') !== null ? sessionStorage.getItem('TKN') : '';
  if (tkn !== null) axios.defaults.headers.common['Authorization'] = tkn;
}

export const getTasksByUserId = createAsyncThunk(
  "tasks/getTasksByUserId",
  async () => {
    setToken();
    const res = await axios.get(`${BASE_URL}/tasks/users/${sessionStorage.getItem('UID')}`);
    return res.data.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (name: string) => {
    setToken();
    const res = await axios.post(`${BASE_URL}/tasks`, {
      name, user_id: sessionStorage.getItem('UID')
    });
    return res.data.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (item: any) => {
    setToken();
    const res = await axios.put(`${BASE_URL}/tasks/${item.task_id}`, item);
    if (res.data.success) {
      return item;
    }
    return [];
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (item: any) => {
    setToken();
    const res = await axios.delete(`${BASE_URL}/tasks/${item.task_id}`);
    if (res.data.success) {
      return item;
    }
    return [];
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTasksByUserId.fulfilled, (state, action) => {
        if (state.data.length === 0 && fetch) {
          state.data = action.payload;
          fetch = false;
        } else {
          let result = state.data.filter(o1 => !action.payload.some((o2: any) => o1.task_id === o2.task_id && o1.completed === o2.completed));
          if (result.length > 0) {
            state.data = action.payload;
          }
          fetch = true;
        }
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        let datos = [...state.data];
        const index: number = datos.findIndex(x => x.task_id === action.payload.task_id);
        if (index > -1) {
          state.data[index] = {
            ...state.data[index],
            ...action.payload
          };
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index: number = state.data.findIndex(x => x.task_id === action.payload.task_id);
        if (index > -1) {
          state.data.splice(index, 1);
        }
      });
  }
});

export default taskSlice.reducer;