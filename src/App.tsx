import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from 'components/Layout';
import { authorizedRoutes, notAuthorizedRoutes } from 'utils/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [...notAuthorizedRoutes, ...authorizedRoutes],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
