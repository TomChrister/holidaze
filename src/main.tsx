import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './layout';
import { Home, VenuePage, Login, Register, CreateVenue, Explore } from './routes';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/explore',
                element: <Explore/>
            },
            {
                path: '/venues/:id',
                element: <VenuePage/>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/create',
                element: <CreateVenue />
            },
        ]
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
