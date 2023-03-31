import { Reptile } from "@prisma/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { speciesStrings } from "../types/Strings";
export const NewSchedule = () => {

  const navigate = useNavigate();
  const api = useApi();
  const { token, setToken } = useAuth();
  const [type, setType] = useState("feeding");
  const [description, setDescription] = useState("");
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    if (!token) {
      navigate("/"), {
        replace: true
      }
    }
  }, []);

  async function createSchedule() {
    if (description == "") {
      setErrorMessage("FoodItem must be specified");
      return;
    }
    const feeding = {
      type,
      description,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    }
    
    const id = window.location.href.split("/")[4]; 
    const responseBody = await api.post(`${import.meta.env.VITE_SERVER_URL}/reptile/${id}/schedule`, feeding);
    console.log(responseBody.message)
    if (responseBody.message == "Created a schedule") {
      navigate(`/reptile/${id}`, { replace: true });
    }
    else {
      setErrorMessage("Unable to create schedule");
    }
  }


  return (
    <div>
      <p>Enter the information for new schedule</p>
      <div className="inputs">
        Type:
        <select name="sex" value={type} onChange={(e) => setType(e.target.value)} className="text-inputs">
          <option value="feed">Feeding</option>
          <option value="record">Record</option>
          <option value="clean">Clean</option>
        </select>
      </div>
      <div className="inputs">
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="text-inputs" />
      </div>
      <div className="inputs">
        Monday?:
        <input type="checkbox" checked={monday} onChange={(e) => setMonday(e.target.checked)} className="text-inputs" />
      </div>
      <div className="inputs">
        Tuesday?:
        <input type="checkbox" checked={tuesday} onChange={(e) => setTuesday(e.target.checked)} className="text-inputs" />
      </div>
      <div className="inputs">
        Wednesday?:
        <input type="checkbox" checked={wednesday} onChange={(e) => setWednesday(e.target.checked)} className="text-inputs" />
      </div>
      <div className="inputs">
        Thursday?:
        <input type="checkbox" checked={thursday} onChange={(e) => setThursday(e.target.checked)} className="text-inputs" />
      </div>
      <div className="inputs">
        Friday?:
        <input type="checkbox" checked={friday} onChange={(e) => setFriday(e.target.checked)} className="text-inputs" />
      </div>
      <div className="inputs">
        Saturday?:
        <input type="checkbox" checked={saturday} onChange={(e) => setSaturday(e.target.checked)} className="text-inputs" />
      </div>
      <div className="inputs">
        Sunday?:
        <input type="checkbox" checked={sunday} onChange={(e) => setSunday(e.target.checked)} className="text-inputs" />
      </div>
      <div>
        <button onClick={() => createSchedule()}>Create Schedule</button>
      </div>

      <div>
        <p>{errorMessage}</p>
      </div>
    </div>
  )
}