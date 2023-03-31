import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { useApi } from "../hooks/useApi";

interface User {
  id?: number;
  email: String;
  passwordHash: String;
}

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const setToken = useContext(AuthContext);

  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorDisplayed) {
      const timeout = setTimeout(() => {
        setErrorDisplayed(false);
      }, 1500);
      return () => {
        clearTimeout(timeout);
      }
    }
    return () => { };
  }, [errorDisplayed]);

  async function login() {
    if (!email || !password) return;

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
    } else {
      setEmail("");
      setPassword("");
      setErrorDisplayed(true);
    }
  }

  return (
    <div>
      <h1 className="center">Login</h1>
      <div className="flex center column">
        <div className="inputs flex center column">
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

      <div className={`popup ${errorDisplayed ? 'show' : ''}`}>Incorrect Email or Password</div>
    </div>
  )
}