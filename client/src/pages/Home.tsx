import { Link } from "react-router-dom"

// TODO: Home Page
// If I am already logged in, then I should be redirected (replace state) to the dashboard page when I reach this page. 
// Otherwise I should be able to do the following:
// I should see the name of your application
// I should see a description of what the app does.
// I should be able to navigate to the Login page
// I should be able to navigate to the Signup page

const users = [{
  id: 1,
  name: "Joseph"
},{
  id: 2,
  name: "Catelyn"
},{
  id: 3,
  name: "Sophie"
}];

export const Home = () => {
  return  (
    <div>
      {users.map(user => (
        <div key={user.id} >
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
      ))}
    </div>
  )
}