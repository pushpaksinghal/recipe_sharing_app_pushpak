import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/Auth.jsx';
import Home from './components/MainScreen.jsx';
import Category from './components/Category.jsx'; // Import Category Component

// Define routes for your app
const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,  // Route for login page
  },
  {
    path: '/home',
    element: <Home />,  // Route for home page
  },
  {
    path: '/categories',
    element: <Category />,  // Route for category page
  },
]);

function App() {
  return (
    <>
      {/* Use RouterProvider to provide the router to the application */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
