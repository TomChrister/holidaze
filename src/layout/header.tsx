import { Link, useNavigate } from 'react-router-dom';
import { GetUserName, isLoggedIn } from '../utils/authHelpers.ts';

const userName = GetUserName();
const loggedIn = isLoggedIn();

export function Header() {
    const navigate = useNavigate();

    return (
        <>
            <header className='flex items-center justify-between px-6 py-4 bg-white shadow-md'>
                <span onClick={() => navigate('/')}
                      className='text-2xl font-bold text-[#F14016] cursor-pointer'>
                    Holidaze
                </span>
                <div className='flex items-center gap-6'>
                    {loggedIn ? (
                        <>
                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.href = '/';
                                }}
                                className='text-gray-700 hover:text-[#F14016]'
                            >
                                Logout
                            </button>
                            {userName && <span className='text-gray-600'>{userName}</span>}
                        </>
                    ) : (
                        <Link to='/login' className='text-gray-700 hover:text-[#F14016]'>
                            Login
                        </Link>
                    )}
                </div>
            </header>
        </>
    )
}