import { Outlet } from 'react-router-dom';
import { Header } from './header.tsx';
import { Footer } from './footer.tsx';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export function Layout() {
    const location = useLocation();
    const isVenuePage = location.pathname.startsWith('/venues/');

    return (
        <>
            <div>
                <Toaster position='top-center' />
                <Header/>
                <main className={isVenuePage ? '' : 'p-8'}>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </>
    );
}