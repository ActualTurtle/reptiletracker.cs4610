"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const api_1 = require("./contexts/api");
const api_2 = require("./lib/api");
const Home_1 = require("./pages/Home");
const Root_1 = require("./pages/Root");
const Dashboard_1 = require("./pages/Dashboard");
const Reptile_1 = require("./pages/Reptile");
const Login_1 = require("./pages/Login");
const SignUp_1 = require("./pages/SignUp");
const router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: '/',
        element: <Root_1.Root />,
        children: [
            {
                path: 'reptile/:id',
                element: <Reptile_1.Reptile />
            },
            {
                path: 'dashboard/:id',
                element: <Dashboard_1.Dashboard />,
            },
            {
                path: 'login',
                element: <Login_1.Login />
            },
            {
                path: 'signup',
                element: <SignUp_1.SignUp />
            },
            {
                path: '/',
                element: <Home_1.Home />
            }
        ]
    },
]);
const App = () => {
    const [api, setApi] = (0, react_1.useState)(new api_2.Api());
    // useEffect(() => {
    //   setApi(new Api());
    // }, []);
    return (<>
      <api_1.ApiContext.Provider value={api}>
        <react_router_dom_1.RouterProvider router={router}/>
      </api_1.ApiContext.Provider>
    </>);
};
exports.App = App;
