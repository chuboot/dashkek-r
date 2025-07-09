import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AreaDetail from './pages/AreaDetail';
import ProtectedRoute from './components/ProtectedRoute';
import ListPelakuUsaha from './pages/ListPelakuUsaha';
import NotFound from './pages/NotFound';
import DetailPelakuUsaha from './pages/DetailPelakuUsaha';
import DashKekKesehatan from './pages/DashKekKesehatan';


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
      <AreaDetail />
    </ProtectedRoute>
  ),
  },
  {
    path: '/dashboard/:areaId/pelaku-usaha/:nama',
    element: (
      <ProtectedRoute>
        <DetailPelakuUsaha />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/:areaId/pelaku-usaha',
    element: <ListPelakuUsaha />,
  },
  {
    path: '/dashboard/kekkesehatan',
    element: (
      <ProtectedRoute>
        <DashKekKesehatan />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);