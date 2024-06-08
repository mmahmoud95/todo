import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const totalTodoAction = createAsyncThunk('totalTodoAction', async () => {
    try {
        const res = await fetch('http://localhost:3000/todo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await res.json();
        console.log(data.data);
        return data.data;
    } catch {
        return 0;
    }
});
export const todosSlice = createSlice({
    name: 'totaltodos',
    initialState: { todos: [] },
    extraReducers: (builder) => {
        builder.addCase(totalTodoAction.fulfilled, (state, action) => {
            console.log(action.payload);
            state.todos = action.payload;
        });
    },
    reducers: {
        deleteTodo: (state, action) => {
            console.log(action.payload);
            state.todos = state.todos.filter(
                (todo) => todo._id !== action.payload
            );
        },
        addTodo: (state, action) => {
            console.log(action.payload);
            state.todos.push(action.payload);
        },
        upDateTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo._id === action.payload._id ? action.payload : todo
            );
        },
    },
});

export const { getTotalTodos, deleteTodo, addTodo, upDateTodo } =
    todosSlice.actions;

export default todosSlice.reducer;
