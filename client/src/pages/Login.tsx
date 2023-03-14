import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
// TODO: Login Page

// I should be able to sign into a user account
// Upon signing in, I should be redirected to the dashboard page

interface User {
    id?: number;
    firstName: String
    lastName: String
    email: String
    passwordHash: String
}

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const bcrypt = require('bcrypt');

    function login() {
        if (!email || !password) return;
        console.log(email);
        console.log(password);

        // TODO: Get user by username
        // compare hashed passes
        // if true, navigate to dashboard
        // if false, print error message, clear username and password
        
    
        /* UGLY */
        // const user: User = {
        //     content: description,
        //     isCompleted: false
        // }
        // const hashedPassword = bcrypt.default.hash(password, 10);
        // fetch("http://localhost:8000/todos", {
        // method: "post",
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify(todo)
        // })
        // .then(r => r.json())
        // .then(body => {
        //     setTodos([body.todo, ...todos]);
        // });
    }

    return (
        <div>
            <h1 className="center">Login</h1>
            <div className="login-buttons column">
                <div className="inputs flex column">
                    <div className="inputs">
                        Email: 
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-inputs" />
                    </div>

                    <div className="inputs">
                        Password: 
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-inputs" />
                    </div>
                </div>

                <button onClick={() => login()}>Log In</button>

                <span className="text-inputs">Don't have an account?
                    <Link to={`/signup`} className="login-links center">Signup</Link>
                </span>
            </div>
        </div>
    )
}