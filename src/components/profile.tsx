'use client';

import { getName } from '@/app/lib/slices/userSlice';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        profileImageUrl: '',
        headline: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/user/getinfo', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await res.json();
                setUserInfo(data.userInfo);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="sm:p-6 sm:col-span-3 col-span-12 max-sm:flex items-center border-b-[1px] border-b-slate-500 sm:border-none px-4">
            <div className="justify-self-center">
                <img
                    width={100}
                    height={100}
                    alt="user profile"
                    src={userInfo.profileImageUrl}
                    className="rounded-full shadow-lg"
                />
            </div>
            <div className="p-4">
                <h1 className="text-base sm:text-lg text-sky-700 font-bold mt-2 ">
                    {userInfo.name}
                </h1>
                <p className="sm:text-base text-xs">{userInfo.headline}</p>
            </div>
        </div>
    );
};
export default Profile;
