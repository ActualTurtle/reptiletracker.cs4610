// TODO: Reptile Page

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Reptile, Schedule, Feeding, HusbandryRecord } from "@prisma/client";

// I should be able to update this reptile
// I should be able to create a feeding for this reptile
// I should be able to create a husbandry record for this reptile
// I should be able to create a schedule for this reptile

export const Reptiles = () => {
  const [reptile, setReptile] = useState<Reptile>();
  const [feedings, setFeedings] = useState<Feeding[]>([]);
  const [husbandries, setHusbandries] = useState<HusbandryRecord[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [scheduleDays, setScheduleDays] = useState({});

  const navigate = useNavigate();
  const api = useApi();

  async function getReptileInfo() {
    const reptileBody = await api.get(`${import.meta.env.VITE_SERVER_URL}/reptile/${window.location.href.slice(-1)}`);
    setReptile(reptileBody.reptile);

    const feedingBody = await api.get(`${import.meta.env.VITE_SERVER_URL}/reptile/${window.location.href.slice(-1)}/feeding`);
    await setFeedings(feedingBody.feedings);

    const husbandryBody = await api.get(`${import.meta.env.VITE_SERVER_URL}/reptile/${window.location.href.slice(-1)}/husbandry`);
    await setHusbandries(husbandryBody.husbandries);

    const scheduleBody = await api.get(`${import.meta.env.VITE_SERVER_URL}/reptile/${window.location.href.slice(-1)}/schedule`);
    await setSchedules(scheduleBody.schedules);

    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    var days = {};
    for (let i=0; i < scheduleBody.schedules.length; i++) {
      var id = scheduleBody.schedules[i].id;
      (days as any)[id] = dayNames.filter(function(key) { return scheduleBody.schedules[i][key] });
    }
    setScheduleDays(days);
  }

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/home");
    }
    // console.log(api);
    getReptileInfo();
  }, []);

  return (
    <div>
      <div className="lists">
        <h1>{reptile?.name}</h1>
      </div>
      <div className="lists">
        <h2>{reptile?.species}</h2>
        <h2>{reptile?.sex}</h2>
      </div>
      <div className="update">
        {/* TODO: Make button do stuff */}
        <button>Update Reptile</button>
      </div>
      
      <div className="lists full">
        <div className="scrollable">
          {
            feedings.map((feeding) =>
              <div key={feeding.id} className="items">
                <p>Food: {feeding.foodItem}</p>
              </div>
            )
          }
        </div>
        <div className="scrollable">
          {
            husbandries.map((husbandry) =>
              <div key={husbandry.id} className="items">
                <p>Length: {husbandry.length}</p>
                <p>Weight: {husbandry.weight}</p>
                <p>Temperature: {husbandry.temperature}</p>
                <p>Humidity: {husbandry.humidity}</p>
              </div>
            )
          }
        </div>
        <div className="scrollable">
          {
            schedules.map((schedule) =>
              <div key={schedule.id} className="items">
                <p>Type: {schedule.type}</p>
                <p>Descriptions: {schedule.description}</p>
                <p>Days: {(scheduleDays as any)[schedule.id].join(', ')}</p>
              </div>
            )
          }
        </div>
      </div>

      <div className="lists">
        {/* TODO: Make buttons do stuff */}
        <button>Create Feeding</button>
        <button>Create Husbandry Record</button>
        <button>Create Schedule</button>
      </div>
    </div>
  )
}