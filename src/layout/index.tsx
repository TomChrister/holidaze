import { Outlet } from 'react-router-dom';
import { Header } from './header.tsx';
import { Footer } from './footer.tsx';
import { Toaster } from 'react-hot-toast';

export function Layout() {

    return (
        <>
            <div>
                <Toaster position='top-center'/>
                <Header/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </>
    );
}