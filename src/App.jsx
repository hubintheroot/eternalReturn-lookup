import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouterInfo } from './common/router/router';

const router = createBrowserRouter(RouterInfo);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
