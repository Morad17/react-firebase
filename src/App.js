import React from "react";
import { Outlet,createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer"
import Login from "./pages/Login";
import Firebase from "./Firebase"

function App() {

  const currentUser = false
  const RequiredAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  const Layout = () => {
    return (<div className="main-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>)
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout/>,
      children: [{
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        elemet: <Login />
      }
    
    ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
