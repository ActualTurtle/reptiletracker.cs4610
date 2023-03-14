// TODO: Dashboard Page

// I should see all of the schedules for my user for the day of the week it is (for example, if it is Monday then I should only see the schedules that have me doing something on Monday.)
// I should see a list of all my reptiles
// When selecting a reptile the app should navigate to the Reptile page
// I should be able to create a new reptile (you can do this on this page via something like a pop up, or you can create a new page for this)
// I should be able to delete a reptile.
// I should be able to log out of my account

// TODO: Client-side logout page
// TODO: Server-side logout page
// TODO: Server-side cookies for jwt, will remove need for jwt_body in request bodies.
// TODO: design appearance better
// TODO: creating a reptile
// TODO: deleting a reptile
// TODO: selecting a reptile
// TODO: switch between reptile and schedule view

import { Reptile, Schedule } from "@prisma/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useApi } from "../hooks/useApi";
export const Dashboard = () => {
  const navigate = useNavigate();
  const api = useApi();

  const [showReptiles, setShowReptiles] = useState(false);
  const [showSchedule, setShowSchedule] = useState(true);
  useEffect(() => {
    console.log(api);
  }, []);

  return (
    <div>
      <div className="page-links">
        <span><Link to={`/logout`} className="login-links">Logout</Link></span>
      </div>
      <div>
        {showReptiles &&
          <ReptilesDOM></ReptilesDOM>
        }
        {showSchedule &&
          <ScheduleDOM></ScheduleDOM>
        }
      </div>
    </div>
  )
}

const ReptilesDOM = () => {
  const [reptiles, setReptiles] = useState<Reptile[]>([]);
  const [loadingReptiles, setLoadingReptiles] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/reptile/")
      .then(response => response.json())
      .then(res => {
        setReptiles(res.reptiles as Reptile[]);
        setLoadingReptiles(false);
      });
  }, [])
  return (
    <div>
      {loadingReptiles && <p>Loading reptiles...</p>}
      {!loadingReptiles &&
        reptiles.map(reptile => {
          return (
            <div className="reptile">
              <p>Species: {reptile.species}</p>
              <p>Name: {reptile.name}</p>
              <p>Sex: {reptile.sex}</p>
              <p>Last Updated: {reptile.updatedAt.toLocaleDateString()}</p>
              <p>Record Created At: {reptile.createdAt.toLocaleDateString()}</p>
            </div>
          )
        })
      }
    </div>
  )
}

const ScheduleDOM = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(true);
  const [day, setDay] = useState("idk man");
  useEffect(() => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    setDay(days[new Date().getDay()]);
    //get user's schedules
    fetch("http://localhost:8000/users/schedule")
      .then(response => response.json())
      .then(res => {
        setSchedules(res.schedules as Schedule[]);
        setLoadingSchedules(false);
      });
  }, []);

  type ScheduleKey = keyof Schedule;

  return (
    <div>
      <p>{day}</p>
      {loadingSchedules && <p>Loading schedules...</p>}
      <div className="schedules">
        {
          schedules.map(schedule => {
            let dayKey: ScheduleKey = day as ScheduleKey;
            if (schedule[dayKey] === true) {
              return (
                <div className="schedule">
                  <p>Reptile: {schedule.reptileId}</p>
                  <p>Type: {schedule.type}</p>
                  <p>Description: {schedule.description}</p>
                  <p>Last updated: {schedule.updatedAt.toLocaleDateString()}</p>
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}