import React, { useContext } from "react";
import { Outlet,createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer"
import Login from "./pages/Login";
import AdminPage from './pages/AdminPage'

import Firebase from "./Firebase"
import { AuthContext } from "./context/AuthContext";
import AddData from "./components/AddData";
import CreateUser from "./pages/CreateUser";

function App() {

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/login" />
  }
  console.log(currentUser);

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
        element: 
          <Home />
      },
      {
        path: "/login",
        element: <Login />
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
      {
        path: "/create-user",
        element: <CreateUser />
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
