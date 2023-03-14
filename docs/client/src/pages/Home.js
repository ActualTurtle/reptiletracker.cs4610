"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const react_router_dom_1 = require("react-router-dom");
// TODO: Home Page
// If I am already logged in, then I should be redirected (replace state) to the dashboard page when I reach this page. 
const Home = () => {
    return (<div className="home">
      <h1>Reptile Tracker</h1>
      <h3 className="description">
        A place for herpetoculturists to observe and plan the care, cultivation, and breeding of their reptiles
      </h3>

      <div className="login-buttons">
        <span><react_router_dom_1.Link to={`/login`} className="login-links">Login</react_router_dom_1.Link></span>
        <span><react_router_dom_1.Link to={`/signup`} className="login-links">Signup</react_router_dom_1.Link></span>
      </div>
    </div>);
};
exports.Home = Home;
