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

    const logout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    const navLink = 'rounded-full px-3 py-2 text-base font-semibold text-ink transition-colors hover:bg-cloud';

    return (
        <>
            <header
                className={`sticky top-0 z-20 border-b border-divider bg-white/95 backdrop-blur transition-transform duration-300
            ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
            >
                <div className='container-page flex h-[72px] items-center justify-between'>
                    <Link to='/' className='font-logo text-2xl font-extrabold tracking-tight text-ink'>
                        holidaze<span className='text-accent'>.</span>
                    </Link>

                    {!hideLinks && (
                        <ul className='hidden items-center gap-1 md:flex'>
                            <li><Link to='/explore' className={navLink}>Explore</Link></li>
                            <li className={navLink}><CreateVenueLink/></li>
                            <li className={navLink}><ProfileLink/></li>
                            <li className='ml-3'>
                                {loggedIn ? (
                                    <button onClick={logout} className='btn-secondary py-2'>
                                        Log out
                                    </button>
                                ) : (
                                    <Link to='/login' className='btn-dark py-2'>Log in</Link>
                                )}
                            </li>
                        </ul>
                    )}

                    {!hideLinks && (
                        <button
                            className='burger-menu flex h-10 w-10 items-center justify-center rounded-full border border-divider md:hidden'
                            onClick={toggleMenu}
                            aria-label='Open menu'
                        >
                            <AlignJustify size={20}/>
                        </button>
                    )}
                </div>
            </header>

            {!hideLinks && isMenuOpen && (
                <>
                    <div
                        className='fixed inset-0 z-[60] bg-ink/50'
                        onClick={toggleMenu}
                    />
                    <aside className='fixed inset-y-0 right-0 z-[60] flex w-4/5 max-w-sm flex-col bg-white p-6'>
                        <div className='mb-8 flex items-center justify-between'>
                            <span className='font-logo text-xl font-extrabold tracking-tight'>
                                holidaze<span className='text-accent'>.</span>
                            </span>
                            <button
                                onClick={toggleMenu}
                                aria-label='Close menu'
                                className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-divider'
                            >
                                <X size={20}/>
                            </button>
                        </div>

                        {loggedIn && (
                            <p className='mb-4 text-sm text-graphite'>
                                Logged in as <span className='font-semibold text-ink'>{userName}</span>
                            </p>
                        )}

                        <ul className='flex flex-col divide-y divide-divider border-y border-divider text-lg font-semibold'>
                            <li className='py-4'><Link to='/explore' onClick={toggleMenu}>Explore</Link></li>
                            <li className='py-4'><CreateVenueLink onClick={toggleMenu}/></li>
                            <li className='py-4'><ProfileLink onClick={toggleMenu}/></li>
                        </ul>

                        <div className='mt-auto'>
                            {loggedIn ? (
                                <button onClick={logout} className='btn-secondary w-full'>Log out</button>
                            ) : (
                                <Link to='/login' onClick={toggleMenu} className='btn-dark w-full'>Log in</Link>
                            )}
                        </div>
                    </aside>
                </>
            )}
        </>
    );
}
