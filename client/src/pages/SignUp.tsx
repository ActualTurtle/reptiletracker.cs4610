import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

// TODO: Signup Page

// I should be able to create a user account
// I should be able to navigate to the Login page
// Upon creating an account I should be redirected to the dashboard page

export const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signup() {
        if (!firstName || !lastName || !email || !password) return;
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
    }

    return (
        <div>
            <h1 className="center">Signup</h1>
            <div className="flex center column">
                <div className="flex inputs center column">
                    <div className="inputs">
                        First Name: 
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="text-inputs" />
                    </div>

                    <div className="inputs">
                        Last Name: 
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="text-inputs" />
                    </div>

                    <div className="inputs">
                        Email: 
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-inputs" />
                    </div>

                    <div className="inputs">
                        Password: 
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-inputs" />
                    </div>
                </div>

                <button onClick={() => signup()}>Sign Up</button>

                <span className="text-inputs">Already have an account?
                    <Link to={`/login`} className="login-links center">Login</Link>
                </span>
            </div>
        </div>
    )
}