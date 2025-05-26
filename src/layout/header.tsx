import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GetUserName, isLoggedIn } from '../utils/authHelpers.ts';
import { CreateVenueLink, ProfileLink } from '../components/HeaderLinks.tsx';
import { AlignJustify, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const hideLinks = ['/login', '/register'].includes(location.pathname);
    const userName = GetUserName();
    const loggedIn = isLoggedIn();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const tolerance = 5;

            if (Math.abs(currentScroll - lastScrollY.current) < tolerance) return;

            if (currentScroll <= 0) {
                setShowHeader(true); // Always show the header on top
            } else if (currentScroll < lastScrollY.current) {
                setShowHeader(true); // Scrolls down
            } else {
                setShowHeader(false); // Scrolls up
            }

            lastScrollY.current = window.scrollY;
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`sticky top-0 z-20 bg-white transition-transform duration-300
            ${showHeader ? 'translate-y-0' : '-translate-y-full'} flex items-center justify-between border-b border-b-gray-200 px-6 py-4 shadow-sm lg:px-20`}
            >
            <span
                onClick={() => navigate('/')}
                className='cursor-pointer text-2xl font-semibold font-logo text-brand-primary'
            >
                Holidaze
            </span>

                {!hideLinks && (
                    <ul className='hidden items-center gap-4 text-lg md:flex'>
                        <li><Link to='/explore'
                                  className='hover:text-brand-primary transition-colors duration-200'>Explore</Link>
                        </li>
                        <li className='hover:text-brand-primary transition-colors duration-200'><CreateVenueLink/></li>
                        <li className='hover:text-brand-primary transition-colors duration-200'><ProfileLink/></li>
                        {loggedIn ? (
                            <li>
                                <button
                                    onClick={() => {
                                        localStorage.clear();
                                        navigate('/');
                                        window.location.reload();
                                    }}
                                    className='text-gray-700 cursor-pointer hover:text-red-500 transition-colors duration-200'
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
                        className='burger-menu md:hidden'
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={24}/> : <AlignJustify size={24}/>}
                    </button>
                )}
            </header>

            {!hideLinks && isMenuOpen && (
                <>
                    <div
                        className='fixed inset-0 z-[60] bg-black/70'
                        onClick={toggleMenu}
                    />
                    <aside
                        className='fixed inset-y-0 right-0 z-[60] w-3/5 border-l border-gray-200 bg-white p-6 shadow-lg'>
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
                                <X size={24} onClick={toggleMenu} className='cursor-pointer'/>
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
        </>
    );
}
