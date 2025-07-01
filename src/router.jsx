import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SanurDetail from './pages/SanurDetail';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
  path: '/dashboard/:areaId',
  element: (
    <ProtectedRoute>
      <SanurDetail />
    </ProtectedRoute>
  ),
  },
]);