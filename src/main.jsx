import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { FavouritesProvider } from './context/FavouritesContext'
import RootLayout from './layouts/RootLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'

import Home from './pages/Home'
import Browse from './pages/Browse'
import MovieDetails from './pages/MovieDetails'
import Register from './pages/Register'
import Login from './pages/Login'
import Favourites from './pages/Favourites'
import Plans from './pages/Plans'
import Payment from './pages/Payment'
import ThankYou from './pages/ThankYou'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminContent from './pages/admin/AdminContent'
import AdminSubscriptions from './pages/admin/AdminSubscriptions'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'browse', element: <Browse /> },
      { path: 'movie/:id', element: <MovieDetails /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'favourites', element: <Favourites /> },
          { path: 'plans', element: <Plans /> },
          { path: 'payment', element: <Payment /> },
          { path: 'thank-you', element: <ThankYou /> },
          { path: 'profile', element: <Profile /> },
        ],
      },
    ],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'users', element: <AdminUsers /> },
          { path: 'content', element: <AdminContent /> },
          { path: 'subscriptions', element: <AdminSubscriptions /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavouritesProvider>
      <RouterProvider router={router} />
    </FavouritesProvider>
  </StrictMode>,
)
