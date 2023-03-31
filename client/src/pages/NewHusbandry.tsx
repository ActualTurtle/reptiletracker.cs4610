import { Reptile } from "@prisma/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { speciesStrings } from "../types/Strings";
export const NewHusbandry = () => {

  const navigate = useNavigate();
  const api = useApi();
  const { token, setToken } = useAuth();
  const [length, setLength] = useState(0.0);
  const [weight, setWeight] = useState(0.0);
  const [temperature, setTemperature] = useState(0.0);
  const [humidity, setHumidity] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    if (!token) {
      navigate("/"), {
        replace: true
      }
    }
  }, []);

  async function createHusbandry() {
    const husbandry = {
      length,
      weight,
      temperature,
      humidity
    }
    
    const id = window.location.href.split("/")[4]; 
    const responseBody = await api.post(`${import.meta.env.VITE_SERVER_URL}/reptile/${id}/husbandry`, husbandry);
    if (responseBody.message == "Created a husbandy") {
      navigate(`/reptile/${id}`, { replace: true });
    }
    else {
      setErrorMessage("Unable to create husbandry");
    }
  }


  return (
    <div>
      <p>Enter the information for new husbandry record</p>
      <div className="inputs">
        Length:
        <input type="number" value={length} onChange={(e) => setLength(parseFloat(e.target.value))} className="text-inputs" />
      </div>
      <div className="inputs">
        Weight:
        <input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} className="text-inputs" />
      </div>
      <div className="inputs">
        Temperature:
        <input type="number" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} className="text-inputs" />
      </div>
      <div className="inputs">
        Humidity:
        <input type="number" value={humidity} onChange={(e) => setHumidity(parseFloat(e.target.value))} className="text-inputs" />
      </div>
      <div>
        <button onClick={() => createHusbandry()}>Create Husbandry</button>
      </div>

      <div>
        <p>{errorMessage}</p>
      </div>
    </div>
  )
}