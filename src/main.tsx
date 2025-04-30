import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './layout';
import { CreateVenuePage, ExplorePage, HomePage, LoginPage, ProfilePage, RegisterPage, VenuePage } from './routes';
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
