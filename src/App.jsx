import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouterInfo } from './util/router';

const router = createBrowserRouter(RouterInfo);

function App() {
  return (
    <div>
      <RouterProvider router={ router }/>
    </div>
  );
}

export default App;
