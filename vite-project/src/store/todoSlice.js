
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ task: action.payload, completed: false });
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    updateTask: (state, action) => {
      const { index, newTask } = action.payload;
      state.tasks[index].task = newTask;
    },
    toggleTaskCompletion: (state, action) => {
      const index = action.payload;
      state.tasks[index].completed = !state.tasks[index].completed;
    },
  },
});

export const { addTask, deleteTask, updateTask, toggleTaskCompletion } = todoSlice.actions;

export default todoSlice.reducer;
