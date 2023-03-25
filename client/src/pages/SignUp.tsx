import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Api } from "../lib/api";

interface User {
  id?: number;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = useApi();
  const setToken = useContext(AuthContext);
  const navigate = useNavigate();

  async function signup() {
    if (!firstName || !lastName || !email || !password) return;

    const user: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    const resultBody = await api.post(`${import.meta.env.VITE_SERVER_URL}/users`, user);
    if (resultBody.token) {
      setToken(resultBody.token);
      navigate(`/dashboard/${resultBody.user.id}`, {
        replace: true
      });
    }
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