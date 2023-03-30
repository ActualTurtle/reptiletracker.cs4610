import { Reptile } from "@prisma/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { speciesStrings } from "../types/Strings";
export const NewFeeding = () => {

  const navigate = useNavigate();
  const api = useApi();
  const { token, setToken } = useAuth();
  const [foodItem, setFoodItem] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    if (!token) {
      navigate("/"), {
        replace: true
      }
    }
  }, []);

  async function createFeeding() {
    if (foodItem == "") {
      setErrorMessage("FoodItem must be specified");
      return;
    }
    const feeding = {
      foodItem
    }
    
    const id = window.location.href.split("/")[4]; 
    const responseBody = await api.post(`${import.meta.env.VITE_SERVER_URL}/reptile/${id}/feeding`, feeding);
    if (responseBody.message == "Created a feeding") {
      navigate(`/reptile/${id}`, { replace: true });
    }
    else {
      setErrorMessage("Unable to create feeding");
    }
  }


  return (
    <div>
      <p>Enter the information for new feeding</p>
      <div className="inputs">
        Food Item:
        <input type="text" value={foodItem} onChange={(e) => setFoodItem(e.target.value)} className="text-inputs" />
      </div>
      <div>
        <button onClick={() => createFeeding()}>Create Feeding</button>
      </div>

      <div>
        <p>{errorMessage}</p>
      </div>
    </div>
  )
}