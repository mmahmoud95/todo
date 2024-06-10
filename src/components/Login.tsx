'use client';

import { addInfo } from '@/app/lib/slices/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const { email, password } = formData;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (email === '') return toast.error('Email is required');
        if (password === '') return toast.error('Password is required');

        setLoading(true);

        try {
            const res = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.msg);
                setFormData({ email: '', password: '' });
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            } else {
                toast.error(data.msg || 'login failed');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            <form
                className="flex flex-col bg-slate-400 p-12 border-2 w-full"
                onSubmit={submitHandler}
            >
                <input
                    name="email"
                    value={email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your Email"
                    className="border rounded-none mb-2 p-2 md:w-[320px] sm:w-96 outline-offset-1 outline-sky-900 focus:rounded-none"
                />
                <input
                    name="password"
                    value={password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter your Password"
                    className="border rounded-none mb-2 p-2 md:w-[320px] sm:w-96 outline-offset-1 outline-sky-900 focus:rounded-none"
                />
                <button
                    type="submit"
                    className="bg-green-600 p-2 text-2xl text-white mt-4"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Login'}
                </button>
                <p className="text-lg text-white mt-6">
                    You have not account, Please{' '}
                    <Link className="text-sky-900" href="/register">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
