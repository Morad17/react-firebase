import React, { useContext } from "react";
import { Outlet,createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer"
import AdminPage from './pages/AdminPage'

import { AuthContext } from "./context/AuthContext";
import AddData from "./components/AddData";
import InactivityModel from "./components/InactivityModel";

function App() {

  const { currentUser } = useContext(AuthContext)
  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/" />
  }

  const Layout = () => {
    return (<div className="main-layout">
      <Navbar />
      {/* <InactivityModel /> */}
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
        element: 
          <Home />
      },
      {
        path:"/admin-page",
        element:
            <AdminPage />
          
      },
      {
        path: "/add-data",
        element: <AddData />
      },
    
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
