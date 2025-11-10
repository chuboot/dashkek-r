import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AreaDetail from './pages/AreaDetail';
import ProtectedRoute from './components/ProtectedRoute';
import ListPelakuUsaha from './pages/ListPelakuUsaha';
import NotFound from './pages/NotFound';
import DetailPelakuUsaha from './pages/DetailPelakuUsaha';
import ListTenagaKerja from './pages/ListTenagaKerja';
import ListInvestasi from './pages/ListInvestasi';
import TenagaKerjaPage from './pages/TenagaKerjaPage';
import InvestasiPage from './pages/InvestasiPage';
import ProgressPage from './pages/ProgressPage';
import BadanPelakuUsahaPage from './pages/BadanPelakuUsahaPage';
import ListMediaPublic from './pages/ListMediaPublic';


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
    path: '/dashboard/:areaId/tenaga-kerja',
    element: <ListTenagaKerja />,
  },
  {
    path: '/dashboard/:areaId/investasi',
    element: <ListInvestasi />,
  },
  {
    path: '/dashboard/tenagakerja',
    element: <TenagaKerjaPage />,
  },
  {
    path: '/dashboard/investasi',
    element: <InvestasiPage />,
  },
  {
    path: '/dashboard/progress',
    element: <ProgressPage />,
  },
  {
    path: '/dashboard/badan-pelaku-usaha',
    element: <BadanPelakuUsahaPage />,
  },
  {
    path: '/dashboard/media-publik',
    element: <ListMediaPublic />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);