import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom"
import { ApiContext } from "./contexts/api"
import { Api } from "./lib/api"
import { Home } from "./pages/Home"
import { Root } from "./pages/Root"
import { Dashboard } from "./pages/Dashboard"
import { Reptile } from "./pages/Reptile"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'reptile/:id',
        element: <Reptile />
      },
      {
        path: 'dashboard/:id',
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
        path: '/',
        element: <Home />
      }
    ]
  },
])

export const App = () => {

  const [api, setApi] = useState(new Api());

  // useEffect(() => {
  //   setApi(new Api());
  // }, []);


  return (
    <>
      <ApiContext.Provider value={api}>
        <RouterProvider router={router} />
      </ApiContext.Provider>
    </>
  )
}
