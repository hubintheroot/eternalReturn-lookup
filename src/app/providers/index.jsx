import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/shared/lib/AuthProvider';
import { RouterInfo } from '@/app/router';

const router = createBrowserRouter(RouterInfo);

export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      {children}
    </AuthProvider>
  );
}