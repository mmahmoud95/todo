'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Header = () => {
    const router = useRouter();
    const logOut = async () => {
        try {
            const res = await fetch('http://localhost:3000/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await res.json();
            if (res.ok) {
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { todos } = useSelector((state) => state.todos);
    return (
        <div className="text-center bg-slate-900 text-blue-500 py-3  font-semibold text-2xl">
            Total Todos : {todos.length}
            <button
                onClick={logOut}
                className="bg-red-500 text-white py-1 px-4 rounded-full ms-14 font-semibold text-base text-right hover:bg-red-300 hover:text-slate-900 transition ease-in-out duration-200"
            >
                Log out
            </button>
        </div>
    );
};
export default Header;
