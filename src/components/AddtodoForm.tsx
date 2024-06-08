import { useState } from 'react';

const AddtodoForm = ({ onAddTodo }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        category: 'personal',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const { title, description, dueDate, category } = formData;
    return (
        <div className="p-2 sm:p-6 sm:w-full flex justify-center flex-col items-center ">
            <form className="flex items-center justify-center">
                <div className="flex flex-col">
                    <input
                        name="title"
                        value={title}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter your title"
                        className="outline-none text-blue-500 text-sm sm:text-base"
                    />
                    <input
                        name="description"
                        value={description}
                        onChange={handleChange}
                        type="description"
                        placeholder="Enter your description"
                        className="outline-none text-blue-500 sm:text-base text-sm mt-2"
                    />{' '}
                </div>
                <div className="flex flex-col">
                    {' '}
                    <input
                        name="dueDate"
                        value={dueDate}
                        onChange={handleChange}
                        type="date"
                        placeholder="Enter your Date"
                        className="outline-none text-blue-500 sm:text-sm text-xs"
                    />{' '}
                    <select
                        name="category"
                        value={category}
                        onChange={handleChange}
                        className="outline-none mt-3 text-xs sm:text-sm"
                    >
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="shopping">Shopping</option>
                    </select>
                </div>
            </form>
            <button
                type="button"
                className="bg-green-300 p-1 text-sm text-gray-600 font-medium border-[1px] border-gray-300 mt-4 shadow hover:bg-green-500 hover:text-white w-1/2 transition-all duration-300 ease-in-out"
                onClick={() => {
                    setFormData({
                        title: '',
                        description: '',
                        dueDate: new Date().toISOString().split('T')[0],
                        category: 'personal',
                    });
                    onAddTodo(formData);
                }}
            >
                {'Add Todo'}
            </button>
        </div>
    );
};
export default AddtodoForm;
