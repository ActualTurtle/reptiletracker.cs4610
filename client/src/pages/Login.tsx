import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { useApi } from "../hooks/useApi";
// TODO: Login Page

// I should be able to sign into a user account
// Upon signing in, I should be redirected to the dashboard page

interface User {
  id?: number;
  email: String;
  passwordHash: String;
}

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useContext(AuthContext);

  const api = useApi();
  const navigate = useNavigate();

  async function login() {
    if (!email || !password) return;
    console.log(email);
    console.log(password);

    // TODO: Get user by username
    // compare hashed passes
    // if true, navigate to dashboard
    // if false, print error message, clear username and password

    const user: User = {
      email: email,
      passwordHash: password
    }

    const resultBody = await api.post(`${import.meta.env.VITE_SERVER_URL}/login`, { email, password });
    if (resultBody.token) {
      setToken(resultBody.token);
      navigate(`/dashboard`, {
        replace: true
      });
    }
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