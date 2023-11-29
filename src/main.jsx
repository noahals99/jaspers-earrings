import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from "react-router-dom"
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage'
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';
import ProductsPage from './routes/ProductsPage';
import RegisterPage from "./routes/RegisterPage"
import './style/index.css'
import CartPage from './routes/CartPage';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:"",
        element:<HomePage/>
      },
      {
        path:"/login",
        element:<LoginPage/>
      },
      {
        path:"/products",
        element:<ProductsPage/>
      },
      {
        path:"/cart",
        element:<CartPage/>
      },
      {
        path:"/register",
        element:<RegisterPage/>
      }
  ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
