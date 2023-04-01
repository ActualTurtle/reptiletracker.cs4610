// I should be able to delete a reptile.
// I should be able to log out of my account

// TODO: Client-side logout button
// TODO: Server-side logout route
// TODO: deleting a reptile

import { Reptile, Schedule } from "@prisma/client";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { speciesStrings } from "../types/Strings";
import { Api } from "../lib/api";
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

  async function getSchedules(day: string) {
    const resultBody = await api.get(`${import.meta.env.VITE_SERVER_URL}/users/schedule`);
    const allSchedules = resultBody.schedules as Schedule[];
    const filteredSchedules = [];
    console.log(allSchedules);
    for (let i = 0; i < allSchedules.length; i++) {
      console.log(allSchedules[i][day.toLowerCase() as keyof Schedule])
      if (allSchedules[i][day.toLowerCase() as keyof Schedule]) {
        filteredSchedules.push(allSchedules[i]);
      }
    }
    setSchedules(filteredSchedules);
    setLoadingSchedules(false);
  }

  useEffect(() => {
    if (!token || token == "") {
      navigate("/", {
        replace: true
      });
    }

    getReptiles();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setDay(days[new Date().getDay()]);
    getSchedules(days[new Date().getDay()]);

  }, []);

  function logout() {
    window.localStorage.setItem("token", "");
    navigate("/");
  }

  return (
    <div>
      <div className="page-links">
        <span><button onClick={logout} className="login-links">Logout</button></span>
      </div>
      <div className="dashboard-buttons">
        <button onClick={() => { setShowSchedules(true); setShowReptiles(false); }} className={showSchedule ? "selected" : ""}>Schedules</button>
        <button onClick={() => { setShowReptiles(true); setShowSchedules(false); }} className={showReptiles ? "selected" : ""}>Reptiles</button>
      </div>
      <div>
        {showReptiles &&
          <ReptilesDOM reptiles={reptiles} loading={loadingReptiles} setReptiles={setReptiles}></ReptilesDOM>
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
  loading: boolean,
  setReptiles: React.Dispatch<React.SetStateAction<Reptile[]>>,
}

const ReptilesDOM = (props: ReptileProps) => {
  const navigate = useNavigate();
  const api = useApi();
  async function deleteReptile(reptile: Reptile) {
    const responseBody = await api.del(`${import.meta.env.VITE_SERVER_URL}/reptile/${reptile.id}`);
    props.reptiles.splice(props.reptiles.findIndex(it => it == reptile), 1);
    props.setReptiles([...props.reptiles]);
  }

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
          <div className="reptile">
            <div onClick={() => navigate(`/reptile/${reptile.id}`, { replace: true })}>
              <p>Species: {speciesStrings[reptile.species.toString()]}</p>
              <p>Name: {reptile.name}</p>
              <p>Sex: {reptile.sex == "m" ? "Male" : "Female"}</p>
            </div>
            <button onClick={() => deleteReptile(reptile)}>Delete</button>
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
        <p className="day">{props.day}</p>
        <p>Loading schedules...</p>
      </div>
    )
  }
  if (props.schedules.length == 0) {
    return (
      <div>
        <p className="day">{props.day}</p>
        <p>No schedules for today.</p>
      </div>
    )
  }
  return (
    <div>
      <p className="day">{props.day}</p>
      {props.loading && <p>Loading schedules...</p>}
      <div className="schedules">
        {
          props.schedules.map(schedule => {
            return (
              <div className="schedule">
                <p>Reptile: {schedule.reptileId}</p>
                <p>Type: {schedule.type}</p>
                <p>Description: {schedule.description}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}