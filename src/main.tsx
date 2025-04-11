import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from "./layout";
import { Home } from "./routes";
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VenuePage } from "./pages/VenuePage.tsx";

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
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
