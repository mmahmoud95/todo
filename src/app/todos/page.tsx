import TodosClient from '@/components/todos';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Profile from '../../components/profile';
import { useSelector } from 'react-redux';
import Header from '@/components/header';

const Todos = async () => {
    const token = getCookie('token', { cookies }); // => 'value'
    if (!token) {
        redirect('/login');
    }
    return (
        <>
            <Header />
            <div className="grid grid-cols-12">
                <Profile />
                <TodosClient />
            </div>
        </>
    );
};
export default Todos;
