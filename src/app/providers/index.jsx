import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from '@/shared/lib/AuthProvider';
import { RouterInfo } from '@/app/router';
import i18n from '@/shared/lib/i18n';

const router = createBrowserRouter(RouterInfo);

export function AppProvider({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <RouterProvider router={router} />
        {children}
      </AuthProvider>
    </I18nextProvider>
  );
}