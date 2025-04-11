import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from "./layout";
import { Home, VenuePage, Register } from "./routes";
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/venues/:id',
                element: <VenuePage />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
