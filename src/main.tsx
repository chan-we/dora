import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import App from './App'
import Jsonpath from './pages/jsonpath'
import './index.css'
import ImageCheck from './pages/image-check'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        loader: () => redirect('/jsonpath'),
      },
      {
        path: 'jsonpath',
        element: <Jsonpath />,
      },
      {
        path: 'file-check',
        element: <ImageCheck />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
