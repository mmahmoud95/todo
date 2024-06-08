'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './loader';

const Register = () => {
    const router = useRouter();
    useEffect(() => {
        console.log('Register component rendered');
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        linkedinProfileUrl: '',
    });
    const [loading, setLoading] = useState(false);

    const { name, email, password, linkedinProfileUrl } = formData;

    const submitHandler = async (e) => {
        console.log('Form submitted');
        e.preventDefault();

        if (name === '') return toast.error('Name is required');
        if (email === '') return toast.error('Email is required');
        if (password === '') return toast.error('Password is required');

        setLoading(true);

        try {
            const res = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(formData);
            const data = await res.json();
            console.log(data.msg);
            if (res.ok) {
                toast.success('Registration successful');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    linkedinProfileUrl: '',
                });
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            } else {
                toast.error(data.msg || 'Registration failed');
            }
        } catch (error) {
            console.log(error);
            // toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <form
                    className="flex flex-col bg-slate-400 p-12 border-2 w-full"
                    onSubmit={submitHandler}
                >
                    <input
                        name="name"
                        value={name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter your Name"
                        className="border rounded-none mb-2 p-2 w-96 sm:w-64 outline-offset-1 outline-sky-900 focus:rounded-none"
                    />
                    <input
                        name="email"
                        value={email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Enter your Email"
                        className="border rounded-none mb-2 p-2 w-96 sm:w-64 outline-offset-1 outline-sky-900 focus:rounded-none"
                    />
                    <input
                        name="linkedinProfileUrl"
                        value={linkedinProfileUrl}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter your linkedInUrl"
                        className="border rounded-none mb-2 p-2 w-96 sm:w-64 outline-offset-1 outline-sky-900 focus:rounded-none"
                    />
                    <input
                        name="password"
                        value={password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Enter your Password"
                        className="border rounded-none mb-2 p-2 w-96 sm:w-64 outline-offset-1 outline-sky-900 focus:rounded-none"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 p-2 text-2xl text-white mt-4"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Register'}
                    </button>
                    <p className="text-lg text-white mt-6">
                        You have account, Please{' '}
                        <Link className="text-sky-900" href="/login">
                            login
                        </Link>
                    </p>
                </form>
            )}{' '}
        </div>
    );
};

export default Register;
