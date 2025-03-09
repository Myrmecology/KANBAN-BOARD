import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Pages
import Board from './pages/Board.tsx'
import Login from './pages/Login.tsx'
import CreateTicket from './pages/CreateTicket.tsx'
import EditTicket from './pages/EditTicket.tsx'
import ErrorPage from './pages/ErrorPage.tsx'

// Components
import ProtectedRoute from './components/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'board',
        element: (
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        ),
      },
      {
        path: 'create-ticket',
        element: (
          <ProtectedRoute>
            <CreateTicket />
          </ProtectedRoute>
        ),
      },
      {
        path: 'edit-ticket/:id',
        element: (
          <ProtectedRoute>
            <EditTicket />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)