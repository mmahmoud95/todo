import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IoTrashBinOutline } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

const Todo = ({
    title,
    description,
    dueDate,
    category,
    createdAt,
    completed,
    _id,
    onDelete,
    onUpdate,
}) => {
    const [isChecked, setIsChecked] = useState(completed);
    const [editMode, setEditMode] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedCategory, setUpdateCategory] = useState(category);
    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
    };

    const [updatedDueDate, setUpdatedDueDate] = useState(parseDate(dueDate));

    const handleCheckboxChange = async () => {
        try {
            const res = await fetch(`http://localhost:3000/todo/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !isChecked,
                }),
                credentials: 'include',
            });
            const data = await res.json();
            setIsChecked(!isChecked);
            if (!isChecked) {
                toast.success('Todo is completed');
            } else {
                toast.error('Todo is uncompleted');
            }
        } catch (err) {
            console.log(err.msg);
        }
    };

    const handleSave = async () => {
        const updatedTodo = {
            _id,
            title: updatedTitle,
            description: updatedDescription,
            dueDate: updatedDueDate,
            category: updatedCategory,
            completed: isChecked,
        };
        await onUpdate(updatedTodo);
        setEditMode(false);
    };

    return (
        <div className="bg-slate-100 border-blue-200 border-[1px] p-1 mb-4 container w-4/5">
            {editMode ? (
                <>
                    <div className="flex items-center">
                        <div className="text-left px-2">
                            <input
                                placeholder="title"
                                className="text-sm mb-2 outline-none px-1 bg-slate-50 text-blue-900"
                                value={updatedTitle}
                                onChange={(e) =>
                                    setUpdatedTitle(e.target.value)
                                }
                            />{' '}
                            <input
                                placeholder="description"
                                className="text-sm mb-2 outline-none px-1 bg-slate-50 text-blue-900"
                                value={updatedDescription}
                                onChange={(e) =>
                                    setUpdatedDescription(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col items-center justify-between">
                            <input
                                className="outline-none text-blue-500 bg-transparent w-32 text-sm"
                                value={updatedDueDate}
                                type="date"
                                onChange={(e) =>
                                    setUpdatedDueDate(e.target.value)
                                }
                            />{' '}
                            <select
                                name="category"
                                value={updatedCategory}
                                onChange={(e) =>
                                    setUpdateCategory(e.target.value)
                                }
                                className="outline-none bg-transparent w-32 text-sm"
                            >
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                                <option value="shopping">Shopping</option>
                            </select>
                        </div>
                    </div>
                    <div className="ps-2 text-left">
                        <button
                            className="bg-blue-500 text-white px-1 py-0.5 hover:bg-blue-100 hover:text-blue-500 transition-all duration-200 ease-in-out shadow-sm text-sm"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 text-white px-1 py-0.5 hover:bg-red-100 hover:text-red-500 transition-all duration-200 ease-in-out shadow-sm text-sm ml-1"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <div className="w-full">
                    <div className="flex items-start justify-between w-full">
                        <div className="flex justify-start items-center ps-2">
                            <input
                                className="form-checkbox h-4 w-4 text-sky-500 "
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <div className="px-2 w-full text-left">
                                <h1
                                    className={`${
                                        isChecked
                                            ? 'line-through text-lg whitespace-break-spaces'
                                            : 'text-lg whitespace-break-spaces'
                                    }`}
                                >
                                    {title}
                                </h1>
                                <p className="break-words text-sm">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <button onClick={onDelete} className="p-2">
                                <IoTrashBinOutline className="text-red-800 text-xl" />
                            </button>
                            <button
                                className="p-2"
                                onClick={() => setEditMode(true)}
                            >
                                <FaEdit className="text-yellow-600 text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-1 ms-8">
                        <p className="text-xs text-gray-500">
                            Due Date:{' '}
                            {dueDate
                                ? new Date(dueDate).toISOString().split('T')[0]
                                : 'No due date'}
                        </p>
                        <p className="px-3 text-gray-400 text-xs">{category}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
