'use client';
import React, { useState, useEffect } from 'react';
import Todo from './todo';
import AddTodoForm from './AddtodoForm';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
    addTodo,
    deleteTodo,
    totalTodoAction,
    upDateTodo,
} from '@/app/lib/slices/todosSlice';

const AllTodosClient = () => {
    const [filterCategory, setFilterCategory] = useState('all');
    const todos = useSelector((state) => state.todos.todos);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(totalTodoAction());
    }, [dispatch]);

    const filteredTodos =
        filterCategory === 'all'
            ? todos
            : todos.filter((todo) => todo.category === filterCategory);

    const handleDeleteTodo = async (todoId) => {
        try {
            await fetch(`http://localhost:3000/todo/${todoId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            // Remove the deleted todo from the state
            dispatch(deleteTodo(todoId));
            dispatch(totalTodoAction());
        } catch (err) {
            console.error(err);
        }
    };
    const handleAddTodo = async (newTodo) => {
        if (newTodo.title.trim().length < 5)
            return toast.error('minmum lenght of title is 5');
        if (newTodo.title.trim().length < 5)
            return toast.error('minmum lenght of description is 5');
        try {
            const res = await fetch('http://localhost:3000/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
                credentials: 'include',
            });
            const data = await res.json();
            dispatch(addTodo(data.data));
            dispatch(totalTodoAction());
        } catch (err) {
            console.error(err);
        }
    };

    const handleTodoUpdate = async (updatedTodo) => {
        try {
            const res = await fetch(
                `http://localhost:3000/todo/${updatedTodo._id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedTodo),
                    credentials: 'include',
                }
            );
            const data = await res.json();
            dispatch(upDateTodo(data.data));
            toast.success('Todo updated successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update todo');
        }
    };

    return (
        <div className="col-span-12 sm:col-span-8 lg:col-span-6 text-center pt-2">
            <AddTodoForm onAddTodo={handleAddTodo} />
            <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="mb-4 p-1"
            >
                <option value="all">All Todo</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
            </select>
            <div className="flex justify-center items-center flex-col">
                {filteredTodos.length === 0 ? (
                    <h1>You don't have any todos</h1>
                ) : (
                    filteredTodos?.map((todo) => (
                        <Todo
                            key={todo?._id}
                            {...todo}
                            onDelete={() => handleDeleteTodo(todo?._id)}
                            onUpdate={handleTodoUpdate}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default AllTodosClient;
