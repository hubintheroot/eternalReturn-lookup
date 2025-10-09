import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/shared/lib/AuthProvider';
import store from '@/app/store';
import { RouterInfo } from '@/app/router';

const router = createBrowserRouter(RouterInfo);

export function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        {children}
      </AuthProvider>
    </Provider>
  );
}