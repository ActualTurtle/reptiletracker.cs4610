"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const react_router_dom_1 = require("react-router-dom");
// TODO: This needs adjustment as well
const Root = () => {
    const location = (0, react_router_dom_1.useLocation)();
    let name = "Home";
    if (location.pathname === '/') {
        name = "Profile";
    }
    else {
        name = "Users";
    }
    return (<>
      {/* <nav className="navbar">{name}</nav> */}
      <react_router_dom_1.Outlet />
    </>);
};
exports.Root = Root;
