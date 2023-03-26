import { Reptile } from "@prisma/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { speciesStrings } from "../types/Strings";
export const NewReptile = () => {

  const navigate = useNavigate();
  const api = useApi();
  const { token, setToken } = useAuth();
  const [name, setName] = useState("");
  const [sex, setSex] = useState("m");
  const [species, setSpecies] = useState("ball_python");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/"), {
        replace: true
      }
    }
  }, []);

  async function createReptile() {
    if (name == "") {
      setErrorMessage("Reptile must have a name.");
      return;
    }
    const reptile = {
      name,
      species,
      sex,
    }

    const responseBody = await api.post(`${import.meta.env.VITE_SERVER_URL}/reptile`, reptile);
    if (responseBody.message == "reptile created") {
      navigate("/dashboard", { replace: true });
    }
    else {
      setErrorMessage("Unable to create reptile");
    }
  }


  return (
    <div>
      <p>Enter the information of your new reptile:</p>
      <div className="inputs">
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="text-inputs" />
      </div>
      <div className="inputs">
        Species:
        <select name="species" value={species} onChange={(e) => setSpecies(e.target.value)} className="text-inputs">
          <option value="ball_python">{speciesStrings.ball_python}</option>
          <option value="king_snake">{speciesStrings.king_snake}</option>
          <option value="corn_snake">{speciesStrings.corn_snake}</option>
          <option value="redtail_boa">{speciesStrings.redtail_boa}</option>
        </select>
      </div>
      <div className="inputs">
        Sex:
        <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)} className="text-inputs">
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
      </div>
      <div>
        <button onClick={() => createReptile()}>Create Reptile</button>
      </div>

      <div>
        <p>{errorMessage}</p>
      </div>
    </div>
  )
}