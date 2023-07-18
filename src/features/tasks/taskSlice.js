import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
const initialState = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
    description: "This is a task",
  },
  {
    id: "2",
    title: "Task 2",
    completed: false,
    description: "This is a task",
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      // console.log(state, action);
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      // console.log(action.payload);
      // state.push(action.payload);
      const taskFound = state.find((task) => (task.id = action.payload));
      // console.log(taskFound);
      taskFound && state.splice(state.indexOf(taskFound), 1);
    },
    updateTask: (state, action) => {
      const { id, title, description } = action.payload;
      const taskFound = state.find((task) => task.id === id);
      if (taskFound) {
        taskFound.title = title;
        taskFound.description = description;
      }
    },
  },
});
export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
