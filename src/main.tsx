import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import ErrorPage from './Error-page.tsx'
import CalendarPage from './Calendar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>
  },
  {
    path: "calendar",
    element: <CalendarPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
