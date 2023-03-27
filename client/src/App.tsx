import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom"
import { ApiContext } from "./contexts/api"
import { AuthContext } from "./contexts/auth"
import { Api } from "./lib/api"
import { useAuth } from "./hooks/useAuth"
import { Home } from "./pages/Home"
import { Root } from "./pages/Root"
import { Dashboard } from "./pages/Dashboard"
import { Reptiles } from "./pages/Reptiles"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { NewReptile } from "./pages/NewReptile"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'reptile/:id',
        element: <Reptiles />
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'new_reptile',
        element: <NewReptile />
      },
      {
        path: '/',
        element: <Home />
      }
    ]
  },
])

export const App = () => {

  const { token, setToken } = useAuth();


  return (
    <>
      <AuthContext.Provider value={setToken}>
        <ApiContext.Provider value={new Api(token)}>
          <RouterProvider router={router} />
        </ApiContext.Provider>
      </AuthContext.Provider>
    </>
  )
}
