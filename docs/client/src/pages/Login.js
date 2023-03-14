"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Login = () => {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    function login() {
        if (!email || !password)
            return;
        console.log(email);
        console.log(password);
        // TODO: Get user by username
        // compare hashed passes
        // if true, navigate to dashboard
        // if false, print error message, clear username and password
        const user = {
            email: email,
            passwordHash: password
        };
        fetch("http://localhost:8000/login/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(r => r.json())
            .then(body => {
            console.log(body);
        });
    }
    return (<div>
            <h1 className="center">Login</h1>
            <div className="login-buttons column">
                <div className="inputs flex column">
                    <div className="inputs">
                        Email: 
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-inputs"/>
                    </div>

                    <div className="inputs">
                        Password: 
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-inputs"/>
                    </div>
                </div>

                <button onClick={() => login()}>Log In</button>

                <span className="text-inputs">Don't have an account?
                    <react_router_dom_1.Link to={`/signup`} className="login-links center">Signup</react_router_dom_1.Link>
                </span>
            </div>
        </div>);
};
exports.Login = Login;
