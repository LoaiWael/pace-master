import RootLayout from '@/layouts/RootLayout'
import NotFoundPage from '@/pages/NotFoundPage'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import AnalyticsPage from '@/pages/AnalyticsPage'
import SetupPage from '@/pages/SetupPage'
import DailyWorkPage from '@/pages/DailyWorkPage'
import ToDoListPage from '@/pages/ToDoListPage'

export default createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <SetupPage /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: 'analytics', element: <AnalyticsPage /> },
          { path: 'dailyWork', element: <DailyWorkPage /> },
          { path: 'todo', element: <ToDoListPage /> }
        ]
      }
    ]
  }
])