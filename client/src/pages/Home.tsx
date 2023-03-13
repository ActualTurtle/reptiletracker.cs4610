import { Link } from "react-router-dom"

export const Home = () => {
  return  (
    <div className="home">
      <h1>Reptile Tracker</h1>
      <h3 className="description">
        A place for herpetoculturists to observe and plan the care, cultivation, and breeding of their reptiles
      </h3>
      
      <div className="login-buttons">
        <span><Link to={`/login`} className="login-links">Login </Link></span>
        <span><Link to={`/signup`} className="login-links"> Signup</Link></span>
      </div>
    </div>
  )
}