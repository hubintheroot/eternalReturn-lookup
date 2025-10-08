import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from '@/app/store';
import { RouterInfo } from '@/app/router';

const router = createBrowserRouter(RouterInfo);

export function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      {children}
    </Provider>
  );
}