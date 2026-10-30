import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './layout';
import { HomePage } from './pages/HomePage.tsx';
import { ExplorePage } from './pages/ExplorePage.tsx';
import { VenuePage } from './pages/VenuePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { CreateVenuePage } from './pages/CreateVenuePage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { EditVenuePage } from './pages/EditVenuePage.tsx';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: '/explore',
                element: <ExplorePage/>
            },
            {
                path: '/venues/:id',
                element: <VenuePage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/create',
                element: <CreateVenuePage/>
            },
            {
                path: '/venues/:id/edit',
                element: <EditVenuePage/>
            },
            {
                path: '/profile',
                element: <ProfilePage/>
            },
        ]
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
