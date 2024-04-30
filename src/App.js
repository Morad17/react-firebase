import React, { useContext } from "react";
import { Outlet,createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer"
import AdminPage from './pages/AdminPage'

import { AuthContext } from "./context/AuthContext";
import InactivityModel from "./components/InactivityModel";
import PhotoPage from "./pages/PhotoPage";
import AddPhoto from "./components/AddPhoto";

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
        path: "/add-photo",
        element: <AddPhoto />
      },
      {
        path: "/photo-page/:id",
        element: <PhotoPage />
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
