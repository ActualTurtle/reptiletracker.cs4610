"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const SignUp = () => {
    const [firstName, setFirstName] = (0, react_1.useState)("");
    const [lastName, setLastName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    function signup() {
        if (!firstName || !lastName || !email || !password)
            return;
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            passwordHash: password
        };
        fetch("http://localhost:8000/users", {
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
            <h1 className="center">Signup</h1>
            <div className="flex center column">
                <div className="flex inputs center column">
                    <div className="inputs">
                        First Name: 
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="text-inputs"/>
                    </div>

                    <div className="inputs">
                        Last Name: 
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="text-inputs"/>
                    </div>

                    <div className="inputs">
                        Email: 
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-inputs"/>
                    </div>

                    <div className="inputs">
                        Password: 
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-inputs"/>
                    </div>
                </div>

                <button onClick={() => signup()}>Sign Up</button>

                <span className="text-inputs">Already have an account?
                    <react_router_dom_1.Link to={`/login`} className="login-links center">Login</react_router_dom_1.Link>
                </span>
            </div>
        </div>);
};
exports.SignUp = SignUp;
