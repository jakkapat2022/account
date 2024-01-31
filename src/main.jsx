import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './page/dashboard.jsx'
import NotFound from './page/NotFound.jsx'
import Login from './page/Login.jsx'
import Register from './page/Register.jsx'
import Revenue from './page/Revenue.jsx'
import Expenese from './page/expenese.jsx'
import Nav from './components/reactNav.jsx'
import UpdateAccount from './page/updateAccount.jsx'
import { UserAuthContext } from './components/context/UserAuthContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '../src/App.css'
import PotectedRoute from './components/context/PotectedRoute.jsx'
import Copyright from './components/Copyright.jsx'


const router = createBrowserRouter([
    {
        path:"/",
        element: <PotectedRoute>
                    <Dashboard />
                 </PotectedRoute>
    },
    {
      path:"/revenue",
      element: <PotectedRoute>
                  <Nav/>
                  <Revenue />
               </PotectedRoute>
    },
    {
      path:"/expenese",
      element: <PotectedRoute>
                  <Nav/>
                  <Expenese />
               </PotectedRoute>
    },
    {
      path:"/update",
      element: <PotectedRoute>
                  <Nav/>
                  <UpdateAccount />
               </PotectedRoute>
    },
    {
        path:"login",
        element: <Login/>
    },
    {
      path:"register",
      element: <Register/>
    },
    {
        path:"*",
        element: <NotFound />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContext>
      <RouterProvider router={router} />
    </UserAuthContext>
    <Copyright/>
  </React.StrictMode>,
)
