import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GetUserName, isLoggedIn } from '../utils/authHelpers.ts';
import { CreateVenueLink, ProfileLink } from '../components/HeaderLinks.tsx';
import { AlignJustify, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const hideLinks = ['/login', '/register'].includes(location.pathname);
    const userName = GetUserName();
    const loggedIn = isLoggedIn();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <header className='flex items-center justify-between border-b border-b-gray-100 shadow-sm mb-1 px-6 py-4 lg:px-20 lg:m-0'>
            <span
                onClick={() => navigate('/')}
                className='text-2xl font-semibold cursor-pointer font-logo text-brand-primary'
            >
                Holidaze
            </span>

            {!hideLinks && (
                <ul className='hidden md:flex items-center gap-4 text-lg'>
                    <li><Link to='/explore' className='hover:text-brand-primary'>Explore</Link></li>
                    <li className='hover:text-brand-primary'><CreateVenueLink/></li>
                    <li className='hover:text-brand-primary'><ProfileLink/></li>
                    {loggedIn ? (
                        <li>
                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    navigate('/');
                                    window.location.reload();
                                }}
                                className='text-gray-700 cursor-pointer hover:text-[#F14016]'
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li><Link to='/login' className='hover:text-brand-primary'>Login</Link></li>
                    )}
                </ul>
            )}

            {!hideLinks && (
                <button
                    className='md:hidden'
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <X size={24}/> : <AlignJustify size={24}/>}
                </button>
            )}

            {isMenuOpen && (
                <>
                    <div
                        className='fixed inset-0 z-40 bg-black/70'
                        onClick={toggleMenu}
                    />
                    <aside
                        className='fixed inset-y-0 right-0 z-50 w-3/5 p-6 bg-white border-l border-gray-200 shadow-lg'>
                        <ul className='flex flex-col gap-4'>
                            {loggedIn && (
                                <li className='text-sm text-gray-500'>
                                    Logged in as <span className='font-medium'>{userName}</span>
                                </li>
                            )}

                            <div className='flex justify-between'>
                                <li>
                                    <ProfileLink onClick={toggleMenu}/>
                                </li>
                                <X size={24} onClick={toggleMenu}/>
                            </div>

                            <li>
                                <CreateVenueLink onClick={toggleMenu}/>
                            </li>

                            <li>
                                <Link to='/explore' onClick={toggleMenu}>Explore</Link>
                            </li>

                            {loggedIn ? (
                                <li>
                                    <button
                                        onClick={() => {
                                            localStorage.clear();
                                            navigate('/');
                                            window.location.reload();
                                        }}
                                        className='text-gray-700 hover:text-[#F14016]'
                                    >
                                        Logout
                                    </button>
                                </li>
                            ) : (
                                <li>
                                    <Link to='/login' onClick={toggleMenu} className='text-gray-700'>Login</Link>
                                </li>
                            )}
                        </ul>

                    </aside>
                </>
            )}
        </header>
    );
}
