// TODO: Dashboard Page

// I should see all of the schedules for my user for the day of the week it is (for example, if it is Monday then I should only see the schedules that have me doing something on Monday.)
// I should see a list of all my reptiles
// When selecting a reptile the app should navigate to the Reptile page
// I should be able to create a new reptile (you can do this on this page via something like a pop up, or you can create a new page for this)
// I should be able to delete a reptile.
// I should be able to log out of my account

// TODO: Client-side logout button
// TODO: Server-side logout route
// TODO: design appearance better
// TODO: creating a reptile
// TODO: deleting a reptile
// TODO: selecting a reptile
// TODO: switch between reptile and schedule view

import { Reptile, Schedule } from "@prisma/client";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
export const Dashboard = () => {
  const navigate = useNavigate();
  const api = useApi();

  const [reptiles, setReptiles] = useState<Reptile[]>([]);
  const [loadingReptiles, setLoadingReptiles] = useState(true);

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(true);

  const [day, setDay] = useState("idk man");

  const [showReptiles, setShowReptiles] = useState(false);
  const [showSchedule, setShowSchedules] = useState(true);

  const { token, setToken } = useAuth();

  async function getReptiles() {
    const resultBody = await api.get(`${import.meta.env.VITE_SERVER_URL}/reptile`);
    setReptiles(resultBody.reptiles as Reptile[]);
    setLoadingReptiles(false);
  }

  async function getSchedules() {
    const resultBody = await api.get(`${import.meta.env.VITE_SERVER_URL}/users/schedule`);
    setSchedules(resultBody.schedules as Schedule[]);
    setLoadingSchedules(false);
  }

  function filterSchedules(day: string) {
    const filteredSchedules = [];
    for (let i = 0; i < schedules.length; i++) {
      if (schedules[i][day.toLowerCase() as keyof Schedule]) {
        filteredSchedules.push(schedules[i]);
      }
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/", {
        replace: true
      });
    }

    getReptiles();

    getSchedules();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setDay(days[new Date().getDay()]);

    filterSchedules(days[new Date().getDay()]);
  }, []);



  return (
    <div>
      <div className="page-links">
        <span><Link to={`/logout`} className="login-links">Logout</Link></span>
      </div>
      <div className="dashboard-buttons">
        <button onClick={() => { setShowSchedules(true); setShowReptiles(false); }} className={showSchedule ? "selected" : ""}>Schedules</button>
        <button onClick={() => { setShowReptiles(true); setShowSchedules(false); }} className={showReptiles ? "selected" : ""}>Reptiles</button>
      </div>
      <div>
        {showReptiles &&
          <ReptilesDOM reptiles={reptiles} loading={loadingReptiles}></ReptilesDOM>
        }
        {showSchedule &&
          <ScheduleDOM schedules={schedules} loading={loadingSchedules} day={day}></ScheduleDOM>
        }
      </div>
    </div>
  )
}

interface ReptileProps {
  reptiles: Reptile[],
  loading: boolean
}

const ReptilesDOM = (props: ReptileProps) => {
  const navigate = useNavigate();

  if (props.loading) {
    return (
      <div>
        <p>Loading reptiles...</p>
      </div>
    )
  }
  if (props.reptiles.length == 0) {
    return (
      <div>
        <p>No reptiles!</p>
        <div>
          <span><Link to="/new_reptile" className="link">Add New Reptile</Link></span>
        </div>
      </div>
    )
  }
  return (
    <div>
      {props.reptiles.map(reptile => {
        return (
          <div className="reptile" onClick={() => navigate(`/reptile/${reptile.id}`, { replace: true })}>
            <p>Species: {reptile.species}</p>
            <p>Name: {reptile.name}</p>
            <p>Sex: {reptile.sex == "m" ? "Male" : "Female"}</p>
          </div>
        )
      })
      }
      <div>
        <span><Link to="/new_reptile" className="link">Add New Reptile</Link></span>
      </div>
    </div>
  )
}

interface ScheduleProps {
  schedules: Schedule[],
  day: string,
  loading: boolean
}

const ScheduleDOM = (props: ScheduleProps) => {
  if (props.loading) {
    return (
      <div>
        <p>{props.day}</p>
        <p>Loading schedules...</p>
      </div>
    )
  }
  if (props.schedules.length == 0) {
    return (
      <div>
        <p>{props.day}</p>
        <p>No schedules for today.</p>
      </div>
    )
  }
  return (
    <div>
      <p>{props.day}</p>
      {props.loading && <p>Loading schedules...</p>}
      <div className="schedules">
        {
          props.schedules.map(schedule => {
            return (
              <div className="schedule">
                <p>Reptile: {schedule.reptileId}</p>
                <p>Type: {schedule.type}</p>
                <p>Description: {schedule.description}</p>
                <p>Last updated: {schedule.updatedAt.toLocaleDateString()}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}